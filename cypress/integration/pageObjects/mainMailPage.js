import NavPanel from "./navigationPanel";
import BaseListsPage from "./baseListsPage";

const nav = new NavPanel

class MainMailPage extends BaseListsPage {

    getCreateButton(){
        return cy.get('#mailNewBtn')
    }

    getNavPanel(){
        return cy.contains('.treePanel', '@mailfence.com').should('be.visible')
    }

    getUnreadMailsRows(){
        return cy.get('tr.listUnread')
    }
    
    getLastUnreadMailRow(){
        return this.getUnreadMailsRows().eq(0)
    }

    /**
     * Gets a number of unread messages and returns it as chainable object
     * @return {[Chainable]}      Chainable with a number of unread messages
     */
    getUnreadCount(){
        cy.get('#treeInbox').should('be.visible').then(($el) => {
            if ($el.find('div').length > 1) {
                cy.get('#treeInbox div div').invoke('text').as('count')
            } else {
                cy.wrap(0).as('count')
            }
          })

        return cy.get('@count')
    }

    /**
     * Function refreshes mail list until number of unread mails will be greater than provided value or until times out
     * @param  {[String, Int]} oldValue Previous value of unread counter
     * @param  {[Int]} waitTime Delay between retries (in ms)
     * @param  {[Int]} retries Number of retries until times out
     */
    waitForMailCountToIncrease(oldValue, waitTime = 500, retries = 10){
        const iterate = (i = 0) => {
            if (i===retries) return
        
            this.getUnreadCount().then(newValue => {
                var newCount = parseInt(newValue)
                var oldCount = parseInt(oldValue)

                if (newCount > oldCount) return
                
                this.refresh()
                cy.wait(waitTime)
                cy.then(() => {
                iterate(++i)
                })
            })

        }
        iterate()
    }

}

export default MainMailPage;