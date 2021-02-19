const LOGIN = "test_cypress_1"
const id = Math.floor(Math.random() * 10000).toString()
const contentTitle = "Hello" + id
const contentDescription = "This is a post with id: " + id
const content = id + " this is the content" + id + id
const tags = "Random Content"
const ARTICLE_SUBMIT = 'Publish Article' //content, not css 

describe("Create content - post", function () {
    before(function () {
        cy.SignIn()
    })

    it("Creates content", function () {
        cy.get('ul.navbar-nav').children().as('menu')
        cy.get('@menu').contains("New Post").click()
        cy.get('button').contains(ARTICLE_SUBMIT).should('be.visible')
        cy.get('form').within(($form) => {
            cy.get('input').first().type(contentTitle)
            cy.get('input').eq(1).type(contentDescription)
            cy.get('textarea').last().type(content)
            cy.get('input').last().type(tags)
            cy.contains("Publish Article").click()
        })
        cy.url().should('include', 'article')
    })

    it('Mark-unmark as favorite', function () {
        cy.get('ul.navbar-nav').children().contains(LOGIN).click()
        cy.visit("https://react-redux.realworld.io/#/@test_cypress_1")
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include', 'favorites')
        cy.get('.btn-outline-primary').first().then(($fav) => {
            return $fav.text()  
        }).as('count')
        cy.get('@count').then(($cnt) => {
            expect(parseInt($cnt)).to.eq(2)
        })
        cy.reload()
        // cy.contains('No articles are here... yet.').should('be.visible')
        // cy.go('back')
    })
})