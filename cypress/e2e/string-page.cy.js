import { DELAY_IN_MS } from '../../src/constants/delays';
import { testColors } from '../../src/constants/test';
//import { ElementStates } from "../../../types/element-states";

describe('String page works correctly', () => {
    beforeEach(() => {
        cy.visit('/recursion');
    });

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button').last().should('be.disabled');
    });

    it('should do animation correctly', () => {
        const defaultStep = '1234';
        const firstStep = '4231';
        const secondStep = '4321';

        const preStepColors = [
            testColors.changing,
            testColors.default,
            testColors.default,
            testColors.changing,
        ]

        const firstStepColors = [
            testColors.modified,
            testColors.default,
            testColors.default,
            testColors.modified,
        ]

        const secondStepColors = [
            testColors.modified,
            testColors.changing,
            testColors.changing,
            testColors.modified,
        ]

        const thirdStepColors = [
            testColors.modified,
            testColors.modified,
            testColors.modified,
            testColors.modified,
        ]

        cy.get('input').as('input_el');
        cy.get('button').contains('Развернуть').as('btn');

        cy.get('@input_el').type(defaultStep);
        cy.get('@input_el').should('contain.value', defaultStep);

        cy.get('@btn').contains('Развернуть').should('not.be.disabled');
        cy.get('@btn').contains('Развернуть').click();

        cy.clock();
        
        cy.tick(DELAY_IN_MS);
        cy.get('[class*=circle_circle]').as('circles');
        cy.get('@circles').each(($el, ind) => {
            cy.get($el)
                .should('have.css', 'border-color', preStepColors[ind])
                .should('contain', defaultStep[ind]);
        });
        
        cy.tick(DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el)
                .should('have.css', 'border-color', firstStepColors[ind])
                .should('contain', firstStep[ind]);
        });

        cy.tick(DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el)
                .should('have.css', 'border-color', secondStepColors[ind])
                .should('contain', firstStep[ind])
        });

        cy.tick(DELAY_IN_MS);
        cy.get('@circles').each(($el, ind) => {
            cy.get($el)
                .should('have.css', 'border-color', thirdStepColors[ind])
                .should('contain', secondStep[ind])
        });
    });
})