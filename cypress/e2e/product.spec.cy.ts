describe('template product', (): void => {
  beforeEach('add', (): void => {
    cy.visit('/')
  });

  it('add product', (): void => {
    cy.get('[data-id="add-product"]').children().eq(0).type('Апельсин');
    cy.get('[data-id="add-product"]').children().eq(1).type('Фрукты');
    cy.get('[data-id="add-product"]').children().eq(2).type('10');
    cy.get('[data-id="add-product"]').children().eq(3).click();
  });

  it('search product', (): void => {
    cy.get('.card.p-4').contains('Цена');
    cy.get('[data-id="productSearch"]').should('have.class', 'form-control').type('Хлеб');
  });

});
