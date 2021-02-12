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
const NEW_POST_LINK = 'a[href="#editor"]'
//locators create article page
const ARTICLE_TITLE = 'input[placeholder="Article Title"]'
const ARTICLE_DESCR = 'input[placeholder="What\'s this article about?"]'
const ARTICLE_CONTENT = 'textarea[placeholder="Write your article (in markdown)"]'
const ARTICLE_TAGS = 'input[placeholder="Enter tags"]'
const ARTICLE_SUBMIT = 'Publish Article' //content, not css 
//locators article page
const ARTICLE_DELETE = ' Delete Article' //content not css
const EDIT_ARTICLE = 'a[href*="#/editor/"]'



describe("Create content - post", function(){
    it("Creates a post aftewr login", function(){
        cy.visit(URL)
        cy.get(EMAIL_INPUT).type(EMAIL)
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(LOGIN_BUTTON).click()
        cy.get(SETTINGS_LINK).should('be.visible')
        cy.get(LOGIN_BUTTON).should('not.exist')
    })
    it("Creates a post aftewr login", function(){
        const id = Math.floor(Math.random() * 1000).toString()
        console.log(id)
        let contentTitle = "Hello"+ id
        const contentDescription = "This is a post with id: " + id
        const content = id + " this is the content" + id + id
        const tags = "Random Content"
        cy.get(NEW_POST_LINK).click()
        cy.get('button').contains(ARTICLE_SUBMIT).should('be.visible')
        cy.get(ARTICLE_TITLE).type(contentTitle)
        cy.get(ARTICLE_DESCR).type(contentDescription)
        cy.get(ARTICLE_CONTENT).type(content)
        cy.get(ARTICLE_TAGS).type(tags)
        cy.get('button').contains(ARTICLE_SUBMIT).click()
        cy.url().should('include', '/#/article/')
    })
})