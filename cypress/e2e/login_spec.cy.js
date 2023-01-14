describe('Login Page', () => {
  it('Success Log in', function() {
    // TODO query db instead
    const { username, password } = { username: 'adm', password: 'adm' }
    cy.login(username, password)
  })
  it('Wrong username and password', function() {
    const { username, password } = { username: 'null', password: 'null' }
    cy.visit('/login')

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()

    cy.contains('div', 'Incorrect name or password')
  })
  it('Sign up page', function() {
    cy.visit('/login')
    cy.contains('a', 'Sign up')
    cy.get('div > a')
      .should('have.attr', 'href')
      .and('equal', 'signup')
  })
})
