describe('My First Test', () => {

  it('product', (): void => {
    visit();

    cy.get('[data-id="productSearch"]').should('have.class', 'form-control');
    cy.get('.card.p-4').contains('Цена');
  });

  it('add product', (): void => {
    visit();

    cy.get('[data-id="add-product"]').children().eq(0).type('Апельсин');
    cy.get('[data-id="add-product"]').children().eq(1).type('Фрукты');
    cy.get('[data-id="add-product"]').children().eq(2).type('10');
    cy.get('[data-id="add-product"]').children().eq(3).click();
  });

  it('add to cart', (): void => {
    visit();

    cy.get('table').contains('Добавить в карту');
    cy.get('table').children().eq(1).children().eq(0).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(1).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(2).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(3).contains('Добавить в карту').click();
    cy.get('table').children().eq(1).children().eq(4).contains('Добавить в карту').click();
  });

  it('search product', (): void => {
    visit();

    cy.get('[data-id="productSearch"]').type('Хлеб');
  });

  it('cart', (): void => {
    visit();

    cy.get('[data-id="cartSearch"]').should('have.class', 'form-control').type('RC');
    cy.get('.list-group-item.active').contains('Cart list of products');
  });

});

function visit(): void {
  cy.visit('/');
}
