import BaseListsPage from "./baseListsPage";

class DocumentsPage extends BaseListsPage{

    getNavPanel(){
        return cy.contains('.treePanel', 'My Documents').should('be.visible')
    }

    getFileByName(fileName){
        return cy.contains('tbody tr', fileName)
    }

    getLatestFileByName(fileName){
        const name = fileName.split(".").slice(0, -1).join(".")
        this.sortListByDate()
        return cy.get('tbody tr')
        .filter(`:contains("${name}")`).first()
    }
}

export default DocumentsPage;