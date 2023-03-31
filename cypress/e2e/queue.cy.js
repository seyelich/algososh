import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { firstEl, secondEl, testAddBtnQueueSelector, testCircleIndSelector, testCircleSelector, testClearBtnQueueSelector, testColors, testDeleteBtnQueueSelector, testHeadSelector, testTailSelector, thirdEl } from "../../src/constants/test";

describe('Queue page works correctly', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button[class*=text]').should('be.disabled');
    });

    it('should add element correctly', () => {
        cy.clock();

        cy.get('input').type(firstEl);
        cy.get(testAddBtnQueueSelector).should('be.not.disabled');
        cy.get(testAddBtnQueueSelector).click();
        cy.get('input').should('be.empty');
        cy.get(testAddBtnQueueSelector).should('be.disabled');
        cy.get(testDeleteBtnQueueSelector).should('be.disabled');
        cy.get(testClearBtnQueueSelector).should('be.disabled');
        cy.get(testCircleSelector).should('have.css', 'border-color', testColors.changing);
        cy.get(testHeadSelector).should('contain', 'head');
        cy.get(testTailSelector).should('contain', 'tail');

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(testCircleSelector).should('have.css', 'border-color', testColors.default);
        cy.get(testAddBtnQueueSelector).should('be.disabled');
        cy.get(testDeleteBtnQueueSelector).should('be.not.disabled');
        cy.get(testClearBtnQueueSelector).should('be.not.disabled');

        cy.clock().invoke('restore');
    });

    it('should delete element correctly', () => {
        cy.clock();

        cy.get('input').type(firstEl);
        cy.get(testAddBtnQueueSelector).click();
        
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(testDeleteBtnQueueSelector).should('be.not.disabled');
        cy.get(testDeleteBtnQueueSelector).click();
        cy.get(testAddBtnQueueSelector).should('be.disabled');
        cy.get(testClearBtnQueueSelector).should('be.disabled');
        cy.get(testDeleteBtnQueueSelector).should('be.disabled');
        cy.get(testCircleSelector).should('have.css', 'border-color', testColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(testCircleSelector).should('contain.value', '');
        cy.get(testAddBtnQueueSelector).should('be.disabled');
        cy.get(testDeleteBtnQueueSelector).should('be.disabled');
        cy.get(testClearBtnQueueSelector).should('be.disabled');
        cy.get(testHeadSelector).should('contain', '');
        cy.get(testTailSelector).should('contain', '');

        cy.clock().invoke('restore');
    });

    it('should clear queue correctly', () => {
        cy.clock();
        cy.get('input').type(firstEl);
        cy.get(testAddBtnQueueSelector).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type(secondEl);
        cy.get(testAddBtnQueueSelector).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type(thirdEl);
        cy.get(testAddBtnQueueSelector).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(testClearBtnQueueSelector).should('be.not.disabled');
        cy.get(testClearBtnQueueSelector).click();
        cy.get(testCircleSelector).should('contain', '');
        cy.get(testAddBtnQueueSelector).should('be.disabled');
        cy.get(testDeleteBtnQueueSelector).should('be.disabled');
        cy.get(testClearBtnQueueSelector).should('be.disabled');

        cy.clock().invoke('restore');
    });
})