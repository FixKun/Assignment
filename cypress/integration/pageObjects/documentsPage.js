import BaseListsPage from "./baseListsPage";

class DocumentsPage extends BaseListsPage{

    getNavPanel(){
        return cy.contains('.treePanel', 'My Documents').should('be.visible')
    }

    getFileByName(fileName){
        return cy.contains('tbody tr', fileName)
    }

    /**
     * Sorts a list in descending order and returns the latest element by its filename
     * @param  {[String]} fileName Name of the file to find
     * @param  {[boolean]} draggable Should be true for Cypress to drag'n'drop this element 
     * @return {[Chainable]} Either a row with the latest file by its name or draggable part of the row
     */
    getLatestFileByNameWithDescSort(fileName, draggable = false){
        const name = fileName.split(".").slice(0, -1).join(".")
        this.sortListByDate()
        this.sortDesc()
        if (draggable){
            return cy.get('tbody tr')
            .filter(`:contains("${name}")`).first().find('td').eq(1)
        } else {
            return cy.get('tbody tr')
            .filter(`:contains("${name}")`).first()
        }
        
    }
}

export default DocumentsPage;