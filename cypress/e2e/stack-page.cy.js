import { DELAY_IN_MS } from "../../src/constants/delays";
import { 
    firstEl,
    secondEl,
    testAddBtnStackSelector, 
    testCircleIndSelector, 
    testCircleSelector, 
    testClearBtnStackSelector, 
    testColors, 
    testDeleteBtnStackSelector, 
    thirdEl
} from "../../src/constants/test";
import { testStackEl } from "../support/utils";

describe('Stack page works correctly', () => {
    beforeEach(() => {
        cy.visit('/stack');
        cy.clock();
    });

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button[class*=text]').should('be.disabled');
    });

    it('should add element correctly', () => {
        cy.get('input').type(firstEl);
        cy.get(testAddBtnStackSelector).should('be.not.disabled');
        cy.get(testAddBtnStackSelector).click();
        cy.get(testDeleteBtnStackSelector).should('be.disabled');
        cy.get(testClearBtnStackSelector).should('be.disabled');
        cy.get('input').should('be.empty');

        testStackEl(firstEl);

        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get(testDeleteBtnStackSelector).should('be.not.disabled');
        cy.get(testClearBtnStackSelector).should('be.not.disabled');

        cy.get('input').type(secondEl);

        cy.get(testAddBtnStackSelector).should('be.not.disabled');
        cy.get(testAddBtnStackSelector).click();
        cy.get(testDeleteBtnStackSelector).should('be.disabled');
        cy.get(testClearBtnStackSelector).should('be.disabled');

        testStackEl(secondEl);

        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get(testDeleteBtnStackSelector).should('be.not.disabled');
        cy.get(testClearBtnStackSelector).should('be.not.disabled');

        cy.clock().invoke('restore');
    });

    it('should delete element correctly', () => {
        cy.get('input').type(firstEl);
        cy.get(testAddBtnStackSelector).click();
        
        cy.get(testDeleteBtnStackSelector).should('be.not.disabled');
        cy.get(testDeleteBtnStackSelector).click();
        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get(testClearBtnStackSelector).should('be.disabled');

        cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.changing);

        cy.get(testCircleSelector).each(($el, ind) => {
            cy.get(testCircleIndSelector).contains(ind);

            cy.tick(DELAY_IN_MS);
            cy.get($el).should('not.exist');
        });

        cy.get(testDeleteBtnStackSelector).should('be.disabled');
        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get(testClearBtnStackSelector).should('be.disabled');

        cy.clock().invoke('restore');
    });

    it('should clear stack correctly', () => {
        cy.get('input').type(firstEl);
        cy.get(testAddBtnStackSelector).click();

        cy.tick(DELAY_IN_MS);
        cy.get('input').type(secondEl);
        cy.get(testAddBtnStackSelector).click();

        cy.tick(DELAY_IN_MS);
        cy.get('input').type(thirdEl);
        cy.get(testAddBtnStackSelector).click();

        cy.tick(DELAY_IN_MS);
        cy.get(testClearBtnStackSelector).should('be.not.disabled');
        cy.get(testDeleteBtnStackSelector).should('be.not.disabled');
        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get('input').should('be.empty');
        cy.get(testClearBtnStackSelector).click();

        cy.get(testClearBtnStackSelector).should('be.disabled');
        cy.get(testDeleteBtnStackSelector).should('be.disabled');
        cy.get(testAddBtnStackSelector).should('be.disabled');
        cy.get(testCircleSelector).should('have.length', 0);

        cy.clock().invoke('restore');
    });
})