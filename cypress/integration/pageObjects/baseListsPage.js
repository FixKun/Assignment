import BasePage from "./basePage";
import NavPanel from "./navigationPanel";
import Toolbar from "./toolbarPage";

const nav = new NavPanel
const toolbar = new Toolbar

class BaseListsPage extends BasePage {

    /**
     * Returns root element of a navigation panel of the page
     * @abstract
     * @return {[Chainable]}      Root element of the navigation panel
     */
    getNavPanel() {
        throw new Error("Method 'getNavPanel()' must be implemented.");
      }

    getFolder(name){
        return nav.getNode(this.getNavPanel(), name).first()
    }

    goToFolder(name){
        this.getFolder(name).click()
        this.waitForSpinner()
    }

    selectAll(){
        cy.get('div[title="Select all"]').should('be.visible').then(($el) => {
            if (!$el[0].className.includes('tbBtnActive')) {
                cy.wrap($el).click()
            }
        })
    }

    getToolbar(){
        return cy.get('.toolbar')
    }

    deleteSelected(){
        toolbar.clickButton(
            this.getToolbar(), 
            'Delete'
            )
    }

    getConfirmationDialog(){
        return cy.get('#msgBox').should('be.visible')
    }

    acceptDialog(){
        this.getConfirmationDialog().within(() => {
            cy.get('#dialBtn_YES').click()
        })
    }

    declineDialog(){
        this.getConfirmationDialog().within(() => {
            cy.get('#dialBtn_NO').click()
        })
    }

    sortAsc(){
        toolbar.sortAsc(this.getToolbar())
    }

    sortDesc(){
        toolbar.sortDesc(this.getToolbar())
    }

    sortListByDate(){
        toolbar.sortByDate(this.getToolbar())
    }

    clearFolder(name){
        this.goToFolder(name)
        this.selectAll()
        this.deleteSelected()
        cy.get('body').then(() => {
            if (Cypress.$('#msgBox').length > 0) this.acceptDialog()
        })
        
        this.waitForSpinner()
    }

    clearTrash(){
        this.goToFolder('Trash')
        this.selectAll()
        this.deleteSelected()
        this.acceptDialog()
    }
    
    }
    
    export default BaseListsPage;