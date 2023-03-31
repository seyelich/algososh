import { testColors } from "../../src/constants/test";
import { testFibEl } from "../support/utils";

describe('Fibonacci page works correctly', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    })

    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button').last().should('be.disabled');
    });

    it('should make correct fibonacci numbers', () => {
        const fibArr = [1, 1, 2, 3];
        const testIndex = 3;
        
        cy.clock();

        cy.get('input').as('input_el');
        cy.get('button').contains('Рассчитать').as('btn');

        cy.get('@input_el').type(testIndex);
        cy.get('@btn').click();
        
        testFibEl(fibArr, testColors.default); //first test is for 11 not only 1
        testFibEl(fibArr, testColors.default);
        testFibEl(fibArr, testColors.default);
        testFibEl(fibArr, testColors.default);
        testFibEl(fibArr, testColors.default);
    });
})