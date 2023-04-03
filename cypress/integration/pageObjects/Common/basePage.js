class BasePage {

waitForSpinner(){

    cy.get("tbody", { log: false }).each((element) => {
        cy.get(element, { log: false }).invoke({ log: false }, "attr", "aria-hidden").then((att) => {
            // the definition of "giving up"
            if (att) {
                cy.wait(200, { log: false })
            }
        });
    });

    // cy.get('body').then(() => {
    //     const selector = '.loadingIcon'
    //     if (Cypress.$(selector).length > 0) {
    //         cy.get(selector).should('not.be.visible')
    //     }
    // })
}

}

export default BasePage;