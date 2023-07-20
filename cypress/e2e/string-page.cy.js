import { testColors } from '../../src/constants/test';
import { testStringColor } from '../support/utils';

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
        
        testStringColor(preStepColors, defaultStep);
        testStringColor(firstStepColors, firstStep);
        testStringColor(secondStepColors, firstStep);
        testStringColor(thirdStepColors, secondStep);
    });
})