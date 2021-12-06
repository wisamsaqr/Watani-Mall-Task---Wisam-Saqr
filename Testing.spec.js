/// <reference types="cypress" />

describe("nopCommerce Testing", ()=>
{
    before(()=>
    {
        // Preserve cookie in every test
        Cypress.Cookies.defaults(
        {
            preserve: (cookie) => {
                return true;
            }
        })
    })

    it("Verifying visiting Watani Mall homepage", ()=>
    {
        cy.visit("https://watanimall.com/")
        cy.url().should('eq', 'https://watanimall.com/')
    })

    it("Verifying navigating to all categories then navigating to monitors", ()=>
    {
        // navigating to all categories
        cy.get('nav#nav ul[id^=menu]>li[id^=menu-item]>a').contains('جميع الفئات').click()
        // cy.get('nav#nav ul[id^=menu]>li[id^=menu-item]:nth-child(5)>a').click()
        cy.url().should('include', '/all-categories')


        // navigating to monitors
        cy.get('main#main div.category-row > div:nth-child(3) > a.category-item').click()
        cy.url().should('include', '/monitors')
    })

    


    context("", ()=>
    {
        // go to categories page
        it("Visiting categories page", ()=>
        {
        })
    })
})