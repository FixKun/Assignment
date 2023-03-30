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
        // searching for all rows with file name
        cy.get('tr.trow')
        .filter((index, elt) => { 
            return elt.innerText.match(`.*${name}.*`, 'g') 
        })
        // searching for a max datetime within those rows
        .each(($el, index, $lst) => {
            var tmpDate = moment($el.find('td:nth-child(3)').text(), "MMM DD, YYYY, LT")
            if (tmpDate > date){
                date = tmpDate
                dtText = $el.find('td:nth-child(3)').text()
            } 
        // returning the resulting row
          }).then(() =>{
            cy.contains('tbody tr', dtText).as('row')
          })

          if (draggable){
            return cy.get('@row').find('td').eq(1)
        } else {
            return cy.get('@row')
        }
    }
}

export default DocumentsPage;