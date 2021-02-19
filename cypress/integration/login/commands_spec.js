describe("Create content - post", function(){
    before(function(){
        cy.SignIn()
    })

    it("Creates content", function(){
        cy.NewPost()
    })
})