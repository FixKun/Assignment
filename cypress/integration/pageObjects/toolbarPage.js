class Toolbar {

    clickButton(name){
        this.getButton(name).click()
    }

    getButton(name){
        cy.get('.toolbar').within(() => {
            cy.get('.tbBtn').filter(':visible').then(el => {
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

    openSortOption(){
        cy.get('.toolbar').within(() => {
            cy.get('.sortBy').click()
        })
    }

    sortByDate(){
        this.openSortOption()
        cy.get('.menu').within(() => {
            cy.contains('Date').click()
        })  
    }

    sortAsc(){
        this.openSortOption()
        cy.get('.menu').within(() => {
            cy.contains('Ascending').click()
        }) 
    }

    sortDesc(){
        this.openSortOption()
        cy.get('.menu').within(() => {
            cy.contains('Descending').click()
        }) 
    }
}

export default Toolbar;