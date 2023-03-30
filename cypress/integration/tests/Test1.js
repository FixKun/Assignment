/// <reference types="Cypress"/>

import headerPage from "../pageObjects/headerPage"
import MainMailPage from "../pageObjects/mainMailPage"
import CreateMailPage from "../pageObjects/createMailPage"
import MailPage from "../pageObjects/mailPage"
import DocumentsPage from "../pageObjects/documentsPage"

const header = new headerPage()
const mainPage = new MainMailPage()
const createPage = new CreateMailPage()
const mailPage = new MailPage()
const docsPage = new DocumentsPage()

describe('Test suite', () => {

    before(() => {
        cy.fixture('data').then(function (data) {
            this.data = data
        })
    })

    beforeEach(function() {
        cy.login(this.data.login, this.data.password)
        //teardown
        // header.clickMailButton()
        // mainPage.clearFolder('Inbox')
        // mainPage.clearFolder('Sent')
        // mainPage.clearTrash()
        // header.clickDocumentsButton()
        // docsPage.clearFolder('My documents')
        // docsPage.clearTrash()
      })

    it('Test Test', function() {
            
            header.clickMailButton()
            mainPage.goToFolder('Inbox')
            cy.writeFile(this.data.fileName, this.data.fileBody)

            mainPage.getUnreadCount().as('preCount')

            mainPage.getCreateButton().click()
            createPage.setDestinationEmail(this.data.destinationEmail) 
            createPage.setMailSubject(this.data.mailSubject)      

            // we need to make sure that file is uploaded before sending our email
            cy.intercept('sw?type=gwtmail*').as('fileUpload')
            createPage.uploadFile(this.data.fileName)
            cy.wait('@fileUpload').then(() => {
                createPage.getCreateButton().click()
              })

            // workaround for a bug with "undefined" element
            cy.reload()
            // Another workaround - Cypress keeps clearing aliases/env vars after reload() for some reason
            cy.keepAliases()


            cy.get('@preCount').then(preCount => {
                mainPage.waitForMailCountToIncrease(preCount)
            })
            mainPage.getLastUnreadMailRow().click()
            mailPage.saveAttachmentByFilenameToDocs(this.data.fileName)
            mailPage.selectRootFolderInDocumentPopup()
            mailPage.clickSaveInPopup()
            header.clickDocumentsButton()
            var fileDate
            docsPage.getLatestFile().within(() => {
                cy.get('td').eq(2).then(el => {
                    this.fileDate = el.text()
                })
            })
            
            // docsPage.getLatestFileByNameWithDescSort(this.data.fileName).click().within(() => {
            //     cy.get('td').eq(2).then(el => {
            //         this.fileDate = el.text()
            //     })
            // })

            cy.dragndrop(
                docsPage.getLatestFile(true), 
                docsPage.getFolder('Trash')
                )
            docsPage.goToFolder('Trash')
            // check that file is there
            docsPage.getLatestFile().within(() => {
                cy.get('td').eq(2).should('have.text', this.fileDate)
            })
            // docsPage.getLatestFileByNameWithDescSort(this.data.fileName).within(() => {
            //     cy.get('td').eq(2).should('have.text', this.fileDate)
            // })

        })
    })
