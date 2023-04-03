/// <reference types="Cypress"/>

import HeaderPage from "../pageObjects/Common/headerPage"
import MainMailPage from "../pageObjects/Mail/mainMailPage"
import CreateMailPage from "../pageObjects/Mail/createMailPage"
import MailPage from "../pageObjects/Mail/mailPage"
import DocumentsPage from "../pageObjects/Doc/documentsPage"

const header = new HeaderPage()
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
        cy.generateFixture('test')
        cy.fixture('test').then(function (testData) {
            this.testData = testData
        })

        const password = Cypress.env('password')
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using $env:CYPRESS_password = ...')
          }
        cy.login(this.data.login, password)
        //teardown
        header.clickMailButton()
        mainPage.clearFolder('Inbox')
        mainPage.clearFolder('Sent')
        mainPage.clearTrash()
        header.clickDocumentsButton()
        docsPage.clearFolder('My documents')
        docsPage.clearTrash()
      })

    it('Test Test', function() {
            
            header.clickMailButton()
            mainPage.goToFolder('Inbox')
            cy.writeFile(this.testData.fileName, this.testData.fileBody)

            mainPage.getUnreadCount().as('preCount')

            mainPage.clickCreateMailButton()
            createPage.setDestinationEmail(this.data.destinationEmail) 
            createPage.setMailSubject(this.testData.subject)      

            // we need to make sure that file is uploaded before sending our email
            cy.intercept('sw?type=gwtmail*').as('fileUpload')
            createPage.uploadFile(this.testData.fileName)
            cy.wait('@fileUpload').then(() => {
                createPage.clickSendButton()
              })

            // workaround for a bug with "undefined" element
            cy.reload()
            // Another workaround - Cypress keeps clearing aliases/env vars after reload() for some reason
            cy.keepAliases()


            cy.get('@preCount').then(preCount => {
                mainPage.waitForMailCountToIncrease(preCount)
            })

            mainPage.getMailBySubject(this.testData.subject).click()
            mailPage.saveAttachmentByFilenameToDocs(this.testData.fileName)
            mailPage.selectRootFolderInDocumentPopup()
            mailPage.clickSaveInPopup()
            header.clickDocumentsButton()
            var fileDate
            docsPage.getLatestFileByName(this.testData.fileName).within(() => {
                cy.get('td').eq(2).then(el => {
                    this.fileDate = el.text()
                })
            })

            cy.dragndrop(
                docsPage.getLatestFileByName(this.testData.fileName, true), 
                docsPage.getFolder('Trash')
                )
            docsPage.goToFolder('Trash')
            // check that file is there
            docsPage.getLatestFileByName(this.testData.fileName).within(() => {
                cy.get('td').eq(2).should('have.text', this.fileDate)
            })
        })
    })
