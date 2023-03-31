import { DELAY_IN_MS } from "../../src/constants/delays";
import { 
    firstEl, 
    testAddHeadSelector, 
    testAddIndSelector, 
    testAddTailSelector, 
    testCircleSelector, 
    testColors, 
    testDeleteHeadSelector, 
    testDeleteIndSelector, 
    testDeleteTailSelector, 
    testHeadSelector, 
    testIndInputQueueSelector, 
    testSmallCircleSelector, 
    testTailSelector, 
    testValInputSelector 
} from "../../src/constants/test";

describe('List page works correctly', () => {
    beforeEach(() => {
        cy.visit('/list');
    });
    
    it('should make input disabled', () => {
        cy.get('input').should('be.empty');
        cy.get('button[class*=text]').not(':contains("Удалить из")').should('be.disabled');
    });

    const testInd = 2;

    describe('should add element correctly', () => {
        it('to head', () => {
            cy.clock();

            cy.get(testValInputSelector).type(firstEl);
            cy.get(testAddHeadSelector).should('be.not.disabled');
            cy.get(testAddHeadSelector).click();
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).should('have.css', 'border-color', testColors.modified);
            cy.get(testHeadSelector).should('contain', 'head');

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).should('have.css', 'border-color', testColors.default);
    
            cy.clock().invoke('restore');
        });

        it('to tail', () => {
            cy.clock();

            cy.get(testValInputSelector).type(firstEl);
            cy.get(testAddTailSelector).should('be.not.disabled');
            cy.get(testAddTailSelector).click();
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.modified);
            cy.get(testTailSelector).last().should('contain', 'tail');

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.default);
    
            cy.clock().invoke('restore');
        });

        it('by index', () => {
            //cy.clock();

            cy.get(testValInputSelector).type(firstEl);
            cy.get(testIndInputQueueSelector).type(testInd)
            cy.get(testAddIndSelector).should('be.not.disabled');
            cy.get(testAddIndSelector).click();

            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).eq(1).should('have.css', 'border-color', testColors.default);

            cy.wait(DELAY_IN_MS*2);
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).eq(0).should('have.css', 'border-color', testColors.changing);

            cy.wait(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).eq(1).should('have.css', 'border-color', testColors.changing);

            cy.wait(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('not.exist');
            cy.get(testCircleSelector).eq(2).should('have.css', 'border-color', testColors.modified);

            cy.wait(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('not.exist');
            cy.get(testCircleSelector).eq(2).should('have.css', 'border-color', testColors.default);
    
           // cy.clock().invoke('restore');
        });
    });

    describe('should delete element correctly', () => {
        it('from head', () => {
            cy.clock();

            cy.get(testDeleteHeadSelector).should('be.not.disabled');
            cy.get(testDeleteHeadSelector).click();

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).should('have.css', 'border-color', testColors.changing);

            cy.tick(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).should('have.css', 'border-color', testColors.default);
            cy.get(testHeadSelector).should('contain', 'head');

            cy.tick(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('not.exist');
            cy.get(testCircleSelector).should('have.css', 'border-color', testColors.default);
    
            cy.clock().invoke('restore');
        });

        it('from tail', () => {
            cy.clock();

            cy.get(testDeleteTailSelector).should('be.not.disabled');
            cy.get(testDeleteTailSelector).click();

            cy.tick(DELAY_IN_MS);
            cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.changing);

            cy.tick(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).eq(3).should('have.css', 'border-color', testColors.default);

            cy.tick(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('not.exist');
            cy.get(testCircleSelector).last().should('have.css', 'border-color', testColors.default);
            cy.get(testTailSelector).last().should('contain', 'tail');
    
            cy.clock().invoke('restore');
        });

        it('by index', () => {
            //cy.clock();

            cy.get(testIndInputQueueSelector).type(testInd)
            
            cy.get(testDeleteIndSelector).should('be.not.disabled');
            cy.get(testDeleteIndSelector).click();

            cy.get(testCircleSelector).eq(0).should('have.css', 'border-color', testColors.changing);
            
            cy.wait(DELAY_IN_MS);
            cy.get(testCircleSelector).eq(1).should('have.css', 'border-color', testColors.changing);

            cy.wait(DELAY_IN_MS);
            cy.get(testCircleSelector).eq(2).should('have.css', 'border-color', testColors.changing);

            cy.wait(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('have.css', 'border-color', testColors.changing);
            cy.get(testCircleSelector).eq(2).should('have.css', 'border-color', testColors.default);

            cy.wait(DELAY_IN_MS);
            cy.get(testSmallCircleSelector).should('not.exist');
            cy.get(testCircleSelector).eq(2).should('have.css', 'border-color', testColors.default);

           // cy.clock().invoke('restore');
        });
    });
})