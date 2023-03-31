// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "../integration/pageObjects/loginPage"

const loginPage = new LoginPage()

Cypress.Commands.add('login', (login, password) => {
    cy.visit(Cypress.env('url') + "/sw?type=L&state=0")
    loginPage.getLoginField().type(login)
    loginPage.getPasswordField().type(password, {log: false})
    loginPage.clickLoginButton()
    // making sure language is English
    cy.setCookie('ContactOfficeLocale', 'en_US')
  // is there a way to return HomePage object here to chain from this command in the test?
}) 

// Saves aliases between tests (and when Cypress not behaving)
Cypress.Commands.add('keepAliases', function(aliasList) {
  if (!aliasList) {
    aliasList = Object.keys(this)
      .filter(key => !['test', '_runnable', 'currentTest']
      .includes(key))
  }
  aliasList.forEach(key => {
    cy.wrap(this[key]).as(key)
  })
})


Cypress.Commands.add('dragndrop', function(element, targetElement) {

    targetElement.as('target')

    const BUTTON_INDEX = 0;
    targetElement
        .then($target => {
            return $target[0].getBoundingClientRect()
        }).then(coordsDrop => {
          element
          .then(subject => {
              const coordsDrag = subject[0].getBoundingClientRect();
              cy.wrap(subject)
                  .trigger('mousedown', {
                      button: BUTTON_INDEX,
                      clientX: coordsDrag.x,
                      clientY: coordsDrag.y,
                      force: true
                  })
                  .trigger('mousemove', {
                      button: BUTTON_INDEX,
                      clientX: coordsDrag.x + 2,
                      clientY: coordsDrag.y + 5,
                      force: true,
                      waitForAnimation: true
                  })
              cy.get('@target')
                  .trigger('mousedown', {
                      button: BUTTON_INDEX,
                      clientX: coordsDrag.x + 5,
                      clientY: coordsDrag.y
                  })
                  .trigger('mousemove', {
                    button: BUTTON_INDEX,
                    clientX: coordsDrop.x + 5,
                    clientY: coordsDrop.y - 18,
                    force: true      
                })
                  .trigger('mouseup', { force: true})
          })
  })
})
