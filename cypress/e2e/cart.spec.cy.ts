describe('template cart', (): void => {
  beforeEach('add', (): void => {
    cy.visit('/');
  });

  it('add to cart', (): void => {
    cy.get('table').contains('Добавить в карту');
    cy.get('table').children().eq(1).children().eq(0).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(1).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(2).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(3).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(4).contains('Добавить в карту').click();
  });

  it('cart', (): void => {
    cy.get('[data-id="cartSearch"]').should('have.class', 'form-control').type('RC');
    cy.get('.list-group-item.active').contains('Cart list of products');
  });
});
