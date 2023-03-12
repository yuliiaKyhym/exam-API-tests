
export function login(email, password){
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
          "email": email,
          "password": password
        }
      }).then((response) => {
        expect(response.status).to.be.eq(200)
        token = response.body.accessToken
        return token
})
}