describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      'username': 'test_cy',
      'name': 'test cy',
      'password': 'Test1234'
    }
    )
    cy.request('POST', 'http://localhost:3003/api/users', {
      'username': 'test_diffrent',
      'name': 'test diffrent',
      'password': 'Test1234'
    }
    )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('username')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('test_cy')
      cy.get('#password').type('Test1234')
      cy.get('#login-button').click()

      cy.contains('test cy logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test_cy', password: 'Test1234' })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#NewTitle').type('a blog created by cypress')
      cy.get('#NewAuthor').type('Test author')
      cy.get('#NewUrl').type('http://test.com')
      cy.contains('create').click()

      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.login({ username: 'test_cy', password: 'Test1234' })
        cy.createBlog({
          newtitle: 'a blog created by cypress',
          newurl: 'Test author',
          newAuthor: 'http://test.com'
        })
      })

      it('can be liked', function () {
        cy.get('[data-blogtitle="a blog created by cypress"]').as('blog')
        cy.get('@blog').find('.visbilitybutton').click()
        cy.get('@blog').find('.likes').as('likes')
        cy.get('@likes').find('button').click()
        cy.get('@likes').contains(1)
      })

      it('user who created a blog can delete it', function () {
        cy.get('[data-blogtitle="a blog created by cypress"]').as('blog')
        cy.get('@blog').find('.visbilitybutton').click()
        cy.get('@blog').contains('Delete')
      })

      it('user who didnt created a blog can not delete it', function () {
        cy.login({ username: 'test_diffrent', password: 'Test1234' })
        cy.get('[data-blogtitle="a blog created by cypress"]').as('blog')
        cy.get('@blog').find('.visbilitybutton').click()
        cy.get('@blog').should('not.contain', 'Delete')
      })
    })
    describe('multiple blogs exists',function() {
      beforeEach(function () {
        cy.login({ username: 'test_cy', password: 'Test1234' })
        cy.createBlog({
          newtitle: 'a blog created by cypress 1',
          newurl: 'Test author',
          newAuthor: 'http://test.com',
          likes:1
        })
        cy.createBlog({
          newtitle: 'a blog created by cypress 2',
          newurl: 'Test author',
          newAuthor: 'http://test.com',
          likes:2
        })
      })
      it('blogs are ordered according to likes',function () {
        cy.get('.blogContent').eq(0).should('contain', 'a blog created by cypress 2')
        cy.get('.blogContent').eq(1).should('contain', 'a blog created by cypress 1')
      })
    })
  })
})