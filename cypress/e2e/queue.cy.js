import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Queue page works correctly', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    const firstEl = '1';
    const secondEl = '2';
    const thirdEl = '3';
    
    const defaultColor = 'rgb(0, 50, 255)';
    const color = 'rgb(210, 82, 225)';

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button[class*=text]').should('be.disabled');
    });

    it('should add element correctly', () => {
        cy.clock();

        cy.get('input').type(firstEl);
        cy.get('button[class*=text]').first().should('be.not.disabled');
        cy.get('button[class*=text]').first().click();
        cy.get('[class*=circle_circle]').should('have.css', 'border-color', color);

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[class*=circle_circle]').should('have.css', 'border-color', defaultColor);

        cy.clock().invoke('restore');
    });

    it('should delete element correctly', () => {
        cy.clock();

        cy.get('input').type(firstEl);
        cy.get('button[class*=text]').first().should('be.not.disabled');
        cy.get('button[class*=text]').first().click();
        
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('button[class*=text]').eq(1).should('be.not.disabled');
        cy.get('button[class*=text]').eq(1).click();
        cy.get('[class*=circle_circle]').should('have.css', 'border-color', color);

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[class*=circle_circle]').should('contain.value', ''); //will not work with several elems

        cy.clock().invoke('restore');
    });

    it('should clear queue correctly', () => {
        cy.clock();
        cy.get('input').type(firstEl);
        cy.get('button[class*=text]').first().should('be.not.disabled');
        cy.get('button[class*=text]').first().click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type(secondEl);
        cy.get('button[class*=text]').first().should('be.not.disabled');
        cy.get('button[class*=text]').first().click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type(thirdEl);
        cy.get('button[class*=text]').first().should('be.not.disabled');
        cy.get('button[class*=text]').first().click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('button[class*=text]').eq(2).should('be.not.disabled');
        cy.get('button[class*=text]').eq(2).click();
        cy.get('[class*=circle_circle]').should('contain.value', '');

        cy.clock().invoke('restore');
    });
})