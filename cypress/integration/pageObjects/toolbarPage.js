class Toolbar {

    clickButton(toolbarRoot, name){
        this.getButton(toolbarRoot, name).should('not.have.class', 'tbBtnDisabled').click()
    }

    getButton(toolbarRoot, name){
        toolbarRoot.within(() => {
            cy.get('.tbBtn').then(el => {
                if (el.length <= 4) {
                    cy.get('#toolbar_more').click()
                    cy.contains(name).as('button')
                } else {
                    cy.contains(name).as('button')
                }
            })
            
        })
        return cy.get('@button')
    }

    openSortOption(toolbarRoot){
        toolbarRoot.within(() => {
            cy.get('.sortBy').click()
        })
    }

    sortByDate(toolbarRoot){
        this.openSortOption(toolbarRoot)
        cy.get('.menu').within(() => {
            cy.contains('Date').click()
        })  
    }
}

export default Toolbar;