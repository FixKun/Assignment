
class LoginPage {
    
    getLoginField(){
       return cy.get('#UserID')
    }

    getPasswordField(){
        return cy.get('#Password')
     }

    clickLoginButton(){
        cy.contains('Enter').click()
     }

}

export default LoginPage;