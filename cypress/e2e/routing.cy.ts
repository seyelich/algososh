describe('App routes work correctly', () => {
    beforeEach(() => { //strange behavior with before
        cy.visit('/');
    });

    it('should open main page', () => {
        cy.contains('МБОУ АЛГОСОШ');
    })

    it('should open string page', () => {
        cy.get('a[href*="/recursion"]').click();
        cy.get('h3').contains('Строка');
    });

    it('should open fibonacci page', () => {
        cy.get('a[href*="/fibonacci"]').click();
        cy.get('h3').contains('Последовательность Фибоначчи');
    });

    it('should open sorting page', () => {
        cy.get('a[href*="/sorting"]').click();
        cy.get('h3').contains('Сортировка массива');
    });

    it('should open stack page', () => {
        cy.get('a[href*="/stack"]').click();
        cy.get('h3').contains('Стек');
    });

    it('should open queue page', () => {
        cy.get('a[href*="/queue"]').click();
        cy.get('h3').contains('Очередь');
    });

    it('should open list page', () => {
        cy.get('a[href*="/list"]').click();
        cy.get('h3').contains('Связный список');
    });
})