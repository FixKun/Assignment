class NavPanel {

    getNode(rootElement, name){
        rootElement.then($el => {
            const regexp = new RegExp(`^\\s*${name}\\s*`)
            cy.wrap($el).within(() => {
                cy.contains(regexp).as('node')
            }) 
        })
        return cy.get('@node')
    }

    selectNode(rootElement, name){
        this.getNode(rootElement, name).click()
    }

    selectRootNode(rootElement){
        rootElement.within(() => {
            cy.get('.treeItemRoot').click()
        })
    }

}

export default NavPanel;