import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Fibonacci page works correctly', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    })

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button').last().should('be.disabled');
    });

    it('should make correct fibonacci numbers', () => {
        const fibArr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584];
        const testIndex = 5;
        
        cy.clock();

        cy.get('input').as('input_el');
        cy.get('button').contains('Рассчитать').as('btn');

        cy.get('@input_el').type(testIndex);
        cy.get('@btn').click();
        cy.get('[class*=circle_circle]').as('circles');
        
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el).contains(fibArr[ind]);
            cy.get($el).should('have.css', 'border-color', "rgb(0, 50, 255)");
        });
    });
})