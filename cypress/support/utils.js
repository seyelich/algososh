import { testCircleSelector, testCircleIndSelector, testColors, testHeadSelector } from '../../src/constants/test';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

export const testStringColor = (val, color) => {
    cy.tick(DELAY_IN_MS);
    cy.get(testCircleSelector).each(($el, ind) => {
        cy.get($el)
            .should('have.css', 'border-color', val[ind])
            .should('contain', color[ind]);
    });
};

export const testFibEl = (val, color) => {
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(testCircleSelector).each(($el, ind) => {
        cy.get($el).contains(val[ind]);
        cy.get($el).should('have.css', 'border-color', color);
        cy.get(testCircleIndSelector).contains(ind)
    });
};

export const testStackEl = (val) => {
    cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.changing);
    cy.get(testCircleSelector).last().contains(val);

    cy.get(testCircleSelector).each(($el, ind) => {
        cy.get(testCircleIndSelector).contains(ind);

        cy.tick(DELAY_IN_MS);
        cy.get($el).should('have.css', 'border-color', testColors.default);
    });
    
    cy.get(testHeadSelector).contains('top');
}
