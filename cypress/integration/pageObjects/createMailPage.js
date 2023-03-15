class CreateMailPage {

    getUploadLink(){
        return cy.contains('Attachment')
    }

    uploadFile(filePath){
        this.getUploadLink().click()
        cy.get('input[type=file]').selectFile(filePath, { force: true })
    }

    getDestinationEmail(email){
        return cy.get('#mailTo > input').should('be.visible')
    }

    setDestinationEmail(email){
        cy.get('#mailTo > input').should('be.visible').type(email).type('{enter}')
    }

    setMailSubject(subject){
        cy.get('#mailSubject').should('be.visible').type(subject, {force: true})
    }

    getCreateButton(){
        return cy.get('#mailSend div.btnCtn')
    }

}

export default CreateMailPage;