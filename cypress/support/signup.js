export function signup(email, password){
    cy.request({
        method: 'POST',
        url: '/register',
        body: {
          "email": email,
          "password": password
        }
      }).then((response) => {
        expect(response.status).to.be.eq(201)
      })
}