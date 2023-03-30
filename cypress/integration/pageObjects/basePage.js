class BasePage {

waitForSpinner(){

    cy.get("tbody").each((element) => {
        cy.get(element).invoke("attr", "aria-hidden").then((att) => {
            // the definition of "giving up"
            if (att = true) cy.wait(50)
        });
    });

    // cy.get('tbody').should('be.gt', 5)
    // cy.get('body').then(() => {
    //     const selector = '.loadingIcon'
    //     if (Cypress.$(selector).length > 0) {
    //         cy.get(selector).should('not.be.visible')
    //     }
    // })
}

}

export default BasePage;