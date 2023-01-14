describe('Search Page', () => {
  const { username, password } = { 
    username: 'adm', 
    password: 'adm' 
  }
  context('360x760 (samsung-s10) resolution', () => {
    beforeEach(() => {
      cy.viewport('samsung-s10')
    })
    it('Check collection select and words', () => {
      cy.login(username, password)
      cy.visit('/search')

      cy.get('#collection-words')
      cy.get('#collection-select')
    })
  })
  context('1366x768 (macbook-11) resolution', () => {
    beforeEach(() => {
      cy.viewport('macbook-11')
    })
    it('Computer Resolution', () => {
      cy.login(username, password)
      cy.visit('/search')
      cy.get('#collection-words').should('not.be.visible')
      cy.get('#collection-select').should('not.be.visible')
    })
  })
})
