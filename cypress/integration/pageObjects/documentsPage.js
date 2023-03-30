import moment from "moment/moment";
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
    /**
     * Returns the latest element in the list by its filename
     * @param  {[String]} fileName Name of the file to find
     * @param  {[boolean]} draggable Should be true for Cypress to drag'n'drop this element 
     * @return {[Chainable]} Either a row with the latest file by its filename or draggable part of the row
     */
    getLatestFileByName(fileName, draggable = false){
        var date = 0
        let dtText
        const name = fileName.split(".").slice(0, -1).join(".")
        
        cy.get('#doc_list tr.trow td:nth-child(3) div div').each(($el, index, $lst) => {

            var tmpDate = moment($el.text(), "MMM DD, YYYY, LT")
            if (tmpDate > date){
                date = tmpDate
                dtText = $el.text()
            } 
            
          }).then(() =>{
            const regexp = new RegExp(`${name}.*${dtText}`, 'g')
            cy.contains('tbody tr', regexp).as('row')
          })

          if (draggable){
            return cy.get('@row').find('td').eq(1)
        } else {
            return cy.get('@row')
        }
    }
}

export default DocumentsPage;