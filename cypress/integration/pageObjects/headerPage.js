class headerPage {

    clickMailButton(){
        cy.get('#nav-mail').click()
    }

    clickDocumentsButton(){
        cy.intercept('POST', '/gwt', (req) => {
            if (req.body.includes('getDocuments')) {
                req.alias = 'docLoad'
            }
          })
        cy.get('#nav-docs').click()
        cy.wait('@docLoad')
    }

}

export default headerPage;