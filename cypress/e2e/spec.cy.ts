describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hjem').click()
    cy.get(':nth-child(1) > :nth-child(1) > a > .ant-card > .ant-card-cover > img').click()
    cy.contains('Arkiv').click()
    cy.get('#search-button').type('Anabole steroider')
    cy.contains('Melsom Støle').click()
    cy.contains('Om oss').click()
    cy.contains('Fredrik Sjøberg')
    cy.contains('Kontakt oss').click()
  })
})