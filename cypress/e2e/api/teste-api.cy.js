describe('template spec', () => {
  it('Deve realizar o login com sucesso', () => {
    cy.request({
      method: 'POST',
      url:'http://localhost:3000/login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((response) => {

      // Verifica se o status da resposta é 200 (OK)
      expect(response.status).to.equal(200)
      // Verifica a mensagem retornada da API
      expect(response.body.message).to.equal("Login realizado com sucesso")
    }) 
  })

  it('Deve validar senha incorreta', () => {
    cy.request({
      method: 'POST',
      url:'http://localhost:3000/login',
      body: {
        "email": "fulano@qa.com",
        "password": "senhaIncorreta"
      },
      failOnStatusCode: false
    }).then((response) => {

      // Verifica se o status da resposta é 401 (Sem autorização)
      expect(response.status).to.equal(401)

      // Verifica a mensagem retornada da API
      expect(response.body.message).to.equal("Email e/ou senha inválidos")
    }) 
  });

  it('Deve retornar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/usuarios',
    }).then((response) => {
      // Verifica se o status da resposta é 200 (OK)
      expect(response.status).to.equal(200);
  
      // Verifica a estrutura do objeto retornado
      expect(response.body).to.have.property('quantidade', 1);
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
    });
  });
  
})