import { DELAY_IN_MS } from "../../src/constants/delays";

describe('List page works correctly', () => {
    beforeEach(() => {
        cy.visit('/list');
    });

    const testEl = 'qwe';
    const testInd = '2';
    
    const defaultColor = 'rgb(0, 50, 255)';
    const changingColor = 'rgb(210, 82, 225)';
    const modifiedColor = 'rgb(127, 224, 81)';

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button[class*=text]').not(':contains("Удалить из")').should('be.disabled');
    });

    describe('should add element correctly', () => {
        it('to head', () => {
            cy.clock();

            cy.get('input').first().type(testEl);
            cy.get('button[class*=text]').eq(0).should('be.not.disabled');
            cy.get('button[class*=text]').eq(0).click();
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').should('have.css', 'border-color', modifiedColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').should('have.css', 'border-color', defaultColor);
    
            cy.clock().invoke('restore');
        });

        it('to tail', () => {
            cy.clock();

            cy.get('input').first().type(testEl);
            cy.get('button[class*=text]').eq(1).should('be.not.disabled');
            cy.get('button[class*=text]').eq(1).click();
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').last().should('have.css', 'border-color', modifiedColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').last().should('have.css', 'border-color', defaultColor);
    
            cy.clock().invoke('restore');
        });

        it('by index', () => {
            //cy.clock();

            cy.get('input').first().type(testEl);
            cy.get('input').last().type(testInd)
            cy.get('button[class*=text]').eq(4).should('be.not.disabled');
            cy.get('button[class*=text]').eq(4).click();

            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').eq(1).should('have.css', 'border-color', defaultColor);

            cy.wait(DELAY_IN_MS*2);
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').eq(0).should('have.css', 'border-color', changingColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').eq(1).should('have.css', 'border-color', changingColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('not.exist');
            cy.get('[class*=circle_circle]').eq(2).should('have.css', 'border-color', modifiedColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('not.exist');
            cy.get('[class*=circle_circle]').eq(2).should('have.css', 'border-color', defaultColor);
    
           // cy.clock().invoke('restore');
        });
    });

    describe('should delete element correctly', () => {
        it('from head', () => {
            cy.clock();

            cy.get('button[class*=text]').eq(2).should('be.not.disabled');
            cy.get('button[class*=text]').eq(2).click();

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').should('have.css', 'border-color', changingColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').should('have.css', 'border-color', defaultColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('not.exist');
            cy.get('[class*=circle_circle]').should('have.css', 'border-color', defaultColor);
    
            cy.clock().invoke('restore');
        });

        it('from tail', () => {
            cy.clock();

            cy.get('button[class*=text]').eq(3).should('be.not.disabled');
            cy.get('button[class*=text]').eq(3).click();

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').last().should('have.css', 'border-color', changingColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').eq(3).should('have.css', 'border-color', defaultColor);

            cy.tick(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('not.exist');
            cy.get('[class*=circle_circle]').last().should('have.css', 'border-color', defaultColor);
    
            cy.clock().invoke('restore');
        });

        it('by index', () => {
            //cy.clock();

            cy.get('input').last().type(testInd)
            
            cy.get('button[class*=text]').eq(5).should('be.not.disabled');
            cy.get('button[class*=text]').eq(5).click();

            cy.get('[class*=circle_circle]').eq(0).should('have.css', 'border-color', changingColor);
            
            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').eq(1).should('have.css', 'border-color', changingColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_circle]').eq(2).should('have.css', 'border-color', changingColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('have.css', 'border-color', changingColor);
            cy.get('[class*=circle_circle]').eq(2).should('have.css', 'border-color', defaultColor);

            cy.wait(DELAY_IN_MS);
            cy.get('[class*=circle_small]').should('not.exist');
            cy.get('[class*=circle_circle]').eq(2).should('have.css', 'border-color', defaultColor);

           // cy.clock().invoke('restore');
        });
    });
})