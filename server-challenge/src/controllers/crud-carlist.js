const express = require("express")
const carListRouter = express.Router();
const fs = require('fs');

const readFile = () => {
  const content = fs.readFileSync('./src/data/db.json', 'utf-8')
  return JSON.parse(content)
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content)
  fs.writeFileSync('./src/data/db.json', updateFile, 'utf-8')
}

carListRouter.get('/carList', (req, res) => {
  const content = readFile()
  res.send(content)
})

carListRouter.post('/addCar', (req, res) => {
  const {placa, chassi, renavam, modelo, marca, ano} = req.body
  const currentContent = readFile()
  const id = Math.random().toString(32).substring(2, 9)

  currentContent.push({id, placa, chassi, renavam, modelo, marca, ano})
  writeFile(currentContent)
  res.send('Carro cadastrado com sucesso')
})

carListRouter.put('/editCar/:id', (req, res) => {
  const { id } = req.params
  const {placa, chassi, renavam, modelo, marca, ano} = req.body
  const currentContent = readFile()

  const selectedItem = currentContent.findIndex((item) => item.id === id)

  const {id: cId, placa: cPlaca, chassi: cChassi, renavam: cRenavam, modelo: cModelo, marca: cMarca, ano: cAno} = currentContent[selectedItem]  

  const newObject = {
    id: cId,
    placa: placa? placa : cPlaca,
    chassi: chassi? chassi : cChassi,
    renavam: renavam? renavam : cRenavam,
    modelo: modelo? modelo : cModelo,
    marca: marca? marca : cMarca,
    ano: ano? ano : cAno
  }

  
  currentContent[selectedItem] = newObject
  writeFile(currentContent)

  res.send('Cadastro alterado com sucesso')
})

carListRouter.delete('/deleteCar/:id', (req, res) => {
  const { id } = req.params

  const currentContent = readFile()
  const selectedItem = currentContent.findIndex((item) => item.id === id)

  currentContent.splice(selectedItem, 1)
  
  writeFile(currentContent)
  res.send(true)
})

module.exports = carListRouter