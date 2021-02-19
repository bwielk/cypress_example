const LOGIN = "test_cypress_1"
const PASSWORD = "test_cypress_1"
const EMAIL = "test_cypress_1@test.com"
const URL = "https://react-redux.realworld.io/#/login"

//content
const id = Math.floor(Math.random() * 10000).toString()
const contentTitle = "Hello"+ id
const contentDescription = "This is a post with id: " + id
const content = id + " this is the content" + id + id
const tags = "Random Content"
let urlToSearchThrough = ""

//locators login page
const EMAIL_INPUT = 'input[placeholder="Email"]'
const PASSWORD_INPUT = 'input[placeholder="Password"]'
const LOGIN_BUTTON = 'button[type="submit"]'
//locators user page
const SETTINGS_LINK = 'a[href="#settings"]'
const NEW_POST_LINK = 'a[href="#editor"]'
const PROFILE_PAGE_LINK = 'a[href="#@' + LOGIN + '"]'
const MY_ARTICLES = 'My Articles'
const CURRENT_ARTICLE = 'href="#article/' + contentTitle
const CURRENT_ARTICLE_META = "//*[@href='#article/hello111-p9gbqu']/..//*[@class='article-meta']"
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
    it("Creates a post after login", function(){
        // cy.get(NEW_POST_LINK).click()
        cy.get('ul.navbar-nav').children().contains("New Post").click()
        cy.get('button').contains(ARTICLE_SUBMIT).should('be.visible')
        // cy.get(ARTICLE_TITLE).type(contentTitle)
        // cy.get(ARTICLE_DESCR).type(contentDescription)
        // cy.get(ARTICLE_CONTENT).type(content)
        // cy.get(ARTICLE_TAGS).type(tags)
        // cy.get('button').contains(ARTICLE_SUBMIT).click()
        cy.get('form').within(($form) => {
            cy.get('input').first().type(contentTitle)
            cy.get('input').eq(1).type(contentDescription)
            cy.get('textarea').last().type(content)
            cy.get('input').last().type(tags)
            cy.contains("Publish Article").click()
        })
        cy.log("step1")
        cy.url().should('include', '/#/article/')
        cy.get(PROFILE_PAGE_LINK).click()
        cy.contains(MY_ARTICLES).should('be.visible').click()
        cy.get('.article-preview').first().within(($el) => {
            cy.get('.ion-heart').first().click()
        })
        cy.log("step2")
        cy.contains("Favorited Articles").click().debug()
        cy.contains("No articles are here... yet.").should('not.exist')
        cy.get('.preview-link').first().within(($el) => {
            cy.contains(contentTitle).should('be.visible')
            cy.get('.ion-heart').click()
            cy.reload()
        })
        cy.log("step3")
    })

})