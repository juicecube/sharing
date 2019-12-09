describe("TODO-MVC", () => {
  beforeEach(() => {
    cy.visit('/')
  })
  context('New Todo', () => {
    it('adds items', () => {
      cy.get('input')
      .type('todo A{enter}')
      .type('todo B{enter}')
      .type('todo C{enter}')
      cy.get('li').should('have.length',3)
    })
    it('should not add item if input is empty', () => {
      cy.get('input')
      .type('{enter}')
      cy.get('li').should('have.length',0)
    })
    it('should clear input after add', () => {
      cy.get('input')
      .type('todo A{enter}')
      cy.get('input').should('have.text','')
    })
  })
})