import NavPanel from "./navigationPanel"

const nav = new NavPanel

class MailPage {

    getAttachmentByFileName(fileName){
        return cy.get(`a[title*="${fileName}"]`)
    }

    saveAttachmentByFilenameToDocs(fileName){
        this.getAttachmentByFileName(fileName).rightclick()
        cy.intercept('POST', '/gwt', (req) => {
            if (req.body.includes('getDirectoriesTree')) {
                req.alias = 'docPopup'
            }
          })
        cy.contains('Save in Documents').click()
        cy.wait('@docPopup')
    }

    getDocumentPopup(){
        return cy.contains('div[hidefocus="true"]', 'Document').should('be.visible')
    }

    selectNodeInDocumentPopup(name){
        nav.selectNode(this.getDocumentPopup(), name)
    }

    selectRootFolderInDocumentPopup(){
        nav.selectRootNode(this.getDocumentPopup())
    }

    clickSaveInPopup(){
        cy.intercept('POST', '/gwt', (req) => {
            if (req.body.includes('saveAttachmentInDocuments')) {
                req.alias = 'saveDocs'
            }
          })
        cy.get('#dialBtn_OK').should('be.visible').should('not.have.class', 'GCSDBRWBMB').click()
        cy.wait('@saveDocs')
    }

}

export default MailPage;