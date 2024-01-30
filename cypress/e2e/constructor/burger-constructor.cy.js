import {
   ingredientClass,
   closeButtonClass,
   burgerConstructorClass,
   modal,
   constructorSubmit
} from '../../../src/utils/test-constants'
import { setCookie } from "../../../src/utils/cookie";

describe('constrincor page work right', function () {
   beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.viewport(1920, 1024);
      cy.intercept('GET', 'api/auth/user', {
         fixture: 'user.json'
      }).as('dataLogin');
      cy.intercept('GET', 'api/ingredients', {
         fixture: 'ingredients.json'
      }).as('dataIngredients');
      cy.intercept('POST', 'api/orders', {
         fixture: 'order.json'
      }).as('dataOrders');

      setCookie('token', 'accessToken');
      localStorage.setItem('token', 'refreshToken');
   });

   it('should be modal ingredient', function () {
      cy.get(ingredientClass).eq(0).click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', 'Детали ингридиента');
      cy.get('@modal').should('contain', 'Краторная булка N-200i');
      cy.get('@modal').should('contain', 'Калории,ккал');
      cy.get('@modal').should('contain', '420');
      cy.get('@modal').should('contain', 'Белки, г');
      cy.get('@modal').should('contain', '80');
      cy.get('@modal').should('contain', 'Жиры, г');
      cy.get('@modal').should('contain', '24');
      cy.get('@modal').should('contain', 'Углеводы, г');
      cy.get('@modal').should('contain', '53');
      cy.get(closeButtonClass).click();
      cy.get('@modal').should('not.exist');
   });

   it('should be drug and drop ingredient and create order', function () {
      cy.get(ingredientClass).as('ingredient');
      cy.get(burgerConstructorClass).as('constructor');
      cy.get('@ingredient').eq(1).trigger('dragstart');
      cy.get('@constructor').trigger('drop');
      cy.get('@ingredient').eq(3).trigger('dragstart');
      cy.get('@constructor').trigger('drop');
      cy.get(constructorSubmit).click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '32449');
      cy.get('@modal').should('contain', 'идентификатор заказа');
      cy.get('@modal').should('contain', 'Ваш заказ начали готовить');
      cy.get('@modal').should('contain', 'Дождитесь готовности на орбитальной станции');
      cy.get(closeButtonClass).click();
      cy.get('@modal').should('not.exist');
   });
});