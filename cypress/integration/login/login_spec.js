const LOGIN = "test_cypress_1"
const PASSWORD = "test_cypress_1"
const EMAIL = "test_cypress_1@test.com"
const URL = "https://react-redux.realworld.io/#/login"

//locators login page
const EMAIL_INPUT = 'input[placeholder="Email"]'
const PASSWORD_INPUT = 'input[placeholder="Password"]'
const LOGIN_BUTTON = 'button[type="submit"]'
//locators user page
const SETTINGS_LINK = 'a[href="#settings"]'

describe ("Login", function(){
    it("Sign in", function(){
        cy.visit(URL)
        cy.get(EMAIL_INPUT).type(EMAIL)
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(LOGIN_BUTTON).click()
        cy.get(SETTINGS_LINK).should('be.visible')
        cy.get(LOGIN_BUTTON).should('not.exist')
    })
})