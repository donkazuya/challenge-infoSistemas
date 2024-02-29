process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = require('../../server');

chai.use(chaiHttp);

describe('Todos os Carros', () => {
  it('Deve trazer todos os carros', async() => {
    const res = await chai.request(server).get('/carList');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length)
  })
})

describe('Adicionar Veículo', () => {
  it('Deve adicionar um novo veículo na lista', async() => {
    const res = await chai.request(server).post('/addCar').send({
      placa: "AAA-0A20",
      chassi: "ASDFHJJO34789134AA",
      renavam: 954124541,
      modelo: "E-Kwid",
      marca: "Fiat",
      ano: 2023
    })
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body.marca).to.equal('Fiat');

  })
})

describe('Editar Dados do Veículo por ID', () => {
  it('Deve Editar o cadastro do veículo', async() => {
    const res = await chai.request(server).put('/editCar/test').send({ marca: 'Renault' });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.marca).to.equal('Renault');
  })
})

describe('Deletar Dados do veiculo por ID', () => {
  it('Deve Deletar o cadastro do veículo', async() => {
    const res = await chai.request(server).delete('/deleteCar/test');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('boolean');
    expect(res.body).to.equal(true);
  })
})