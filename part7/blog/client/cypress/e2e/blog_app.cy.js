describe('Blog app', function () {
  const userLogin = {
    username: 'Milwalke',
    name: 'Matt',
    password: 'correct',
  };
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3003/api/users', userLogin);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('Milwalke');
      cy.get('#password').type('correct');
      cy.get('#login-btn').click();
      cy.contains('My Blogs');
    });
    it('throws message with incorrect credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('Milwalke');
      cy.get('#password').type('incorrect');
      cy.get('#login-btn').click();
      cy.contains('Log in to application');
      cy.contains('Wrong username or password');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Milwalke', password: 'correct' });
    });

    it('A blog can be created', function () {
      cy.contains('create').click();
      cy.get('.Title').type('Blog Creation Works');
      cy.get('.Author').type('Pina');
      cy.get('.Url').type('dotcom.com');
      cy.get('#createBlog').click();
      cy.get('.blog').contains('Blog Creation Works');
    });
  });
  describe('When viewing blog list', function () {
    beforeEach(function () {
      cy.login({ username: 'Milwalke', password: 'correct' });
      cy.createBlog({
        title: 'Blog Creation Works',
        author: 'Pina',
        url: 'dotcom.com',
      });
    });
    it('A blog can be liked', function () {
      cy.get('#blogView').click();
      cy.get('#blogLike').click();
    });
    it('A blog can be deleted by creator', function () {
      cy.get('#blogView').click();
      cy.get('.blog').contains('Blog Creation Works');
      cy.get('#blogDelete').click();
      cy.get('.blog').should('not.exist');
    });
    it('Blogs are ordered according to likes', function () {
      cy.createBlog({
        title: 'Im the least liked blog',
        author: 'Noone',
        url: 'dotcom.com',
      });
      cy.createBlog({
        title: 'Most liked blog',
        author: 'Pina',
        url: 'dotcom.com',
      });
      cy.contains('Most liked blog').contains('view').click();
      cy.contains('Most liked blog').contains('like').click().wait(500);
      cy.contains('Most liked blog').contains('like').click().wait(500);
      cy.contains('Most liked blog').contains('like').click().wait(500);
      cy.contains('Blog Creation Works').contains('view').click();
      cy.contains('Blog Creation Works').contains('like').click().wait(500);
      cy.visit('http://localhost:3000');
      cy.get('.blog').eq(0).contains('Most liked blog');
      cy.get('.blog').eq(1).contains('Blog Creation Works');
      cy.get('.blog').eq(2).contains('Im the least liked blog');
    });
  });
});
