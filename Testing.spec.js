/// <reference types="cypress" />


describe("nopCommerce Testing", () => {
    before(() => {
        // Preserve cookie in every test
        Cypress.Cookies.defaults(
            {
                preserve: (cookie) => { return true; }
            })
    })

    it("Verifying visiting Watani Mall homepage", () => {
        cy.visit("/")
        cy.url().should('eq', 'https://watanimall.com/')
    })

    it("Verifying navigating to all categories then navigating to monitors", () => {
        // navigating to all categories
        cy.get('nav#nav ul[id^=menu]>li[id^=menu-item]>a').contains('جميع الفئات').click()
        // cy.get('nav#nav ul[id^=menu]>li[id^=menu-item]:nth-child(5)>a').click()
        cy.url().should('include', '/all-categories')


        // navigating to monitors
        cy.get('main#main div.category-row > div:nth-child(3) > a.category-item').click()
        cy.url().should('include', '/monitors')
    })

    it("Verifying selecting asus filter then sorting the results by price ascendingly", () => {
        // selecting asus filter
        cy.get('main#main div[data-name="manufacturer"] > div[data-value="asus"]').click()
        // cy.get('div[data-value="asus"]').click()
        cy.url().should('include', '/monitors?_manufacturer=asus')

        // sorting the results by price ascendingly
        cy.get('div.shop-page-container > div.sort-filter-row select[name="orderby"]')
            .select('ترتيب حسب: الأدنى سعراً للأعلى', { force: true })
        // cy.get('select[name="orderby"]')
        cy.url().should('include', '/monitors?orderby=price&_manufacturer=asus')
    })

    context("Adding two products to the cart and removing the first product", () => {
        // go to categories page
        it("Adding first product to the cart inside monitors page", () => {
            // clicking adding button
            cy.get('div.shop-products-holder div.product-col:first-child > div.product-item a.btn-add-cart')
                .click({ force: true })
            // cy.get('div.product-col:first-child a.btn-add-cart')

            // Assertions
            cy.get('header#header div.heder-action-nav div.header-mini-cart', { timeout: 20000 })
                .should('be.visible')
            // cy.get('div.header-mini-cart').should('be.visible')

            cy.get('div.mini-cart-items > div.cart-item').should('have.length.greaterThan', 0)

            ///////////////////////////////////////////////
            // cy.get('div.heder-action-nav span.counter ~ i.icon-cart').then($elem=>
            // {
            //     cy.wrap($elem.text()).as('counterBefore')
            // })

            // cy.get('div.heder-action-nav span.counter ~ i.icon-cart').invoke('text').as('counterBefore')

            // cy.get('@counterBefore').invoke('text').then(t=>
            // {
            //     cy.log(t)
            // })
            /////////////////////////////////////////////////

            cy.get('div.heder-action-nav div.cart-header i.icon-close',).click()
        })

        it("Adding second product to the cart inside product's page", () => {
            // navigating to 2nd product
            cy.get('div.shop-products-holder div.product-col:nth-child(2)').click()
            cy.url().should('include', '/monitor-asus')

            cy.get('div.summary form.cart > button[name="add-to-cart"]').contains('إضافة إلى السلة')
                .click()
            // cy.get('button[name="add-to-cart"]')

            // Assertions
            cy.get('header#header div.heder-action-nav div.header-mini-cart', { timeout: 20000 })
                .should('be.visible')
            cy.get('div.mini-cart-items > div.cart-item').should('have.length.greaterThan', 1)
        })



        it("Verifying removing first product from cart", () => {
            // clicking remove anchor
            cy.get('div.mini-cart-items > div.cart-item:first-child > a.cart-remove', { timeout: 20000 })
                .click({ force: true })



            // // cy.get('div[data-value="asus"]').click()
            // cy.url().should('include', '/monitors?_manufacturer=asus')


            // // sorting the results by price ascendingly
            // cy.get('div.shop-page-container > div.sort-filter-row select[name="orderby"]')
            //     .select('ترتيب حسب: الأدنى سعراً للأعلى', {force:true})
            // // cy.get('select[name="orderby"]')
            // cy.url().should('include', '/monitors?orderby=price&_manufacturer=asus')
        })
    })
})