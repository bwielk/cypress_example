const LOGIN = "test_cypress_1"
const PASSWORD = "test_cypress_1"
const EMAIL = "test_cypress_1@test.com"
const URL = "https://react-redux.realworld.io/#/login"

const locators = require("../../fixtures/locators.json")

describe ("Login", function(){
    it("Sign in", function(){
        cy.visit(URL)
        cy.get(locators.login_page.email_input).type(EMAIL)
        cy.get(locators.login_page.password_input).type(PASSWORD)
        cy.get(locators.login_page.login_button).click()
        cy.get(locators.user_page.settings_link).should('be.visible')
        cy.get(locators.login_page.login_button).should('not.exist')
    })
})