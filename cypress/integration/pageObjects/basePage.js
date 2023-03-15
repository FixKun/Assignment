class BasePage {

waitForSpinner(){
    cy.get('body').then(() => {
        const selector = '.loadingIcon'
        // cy.wait(500)
        if (Cypress.$(selector).length > 0) {
            cy.get(selector, {force: true}).should('not.be.visible')
        }
    })
}

}

export default BasePage;