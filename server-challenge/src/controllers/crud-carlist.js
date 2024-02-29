const express = require("express")
const carListRouter = express.Router();
const fs = require('fs');

const pathDb = process.env.NODE_ENV === 'test' ? '../../data/db.json' : './data/db.json'

const readFile = () => {
  const content = fs.readFileSync(pathDb, 'utf-8')
  return JSON.parse(content)
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content)
  fs.writeFileSync(pathDb, updateFile, 'utf-8')
}

carListRouter.get('/carList', (req, res) => {
  const content = readFile()
  res.status(200).json(content)
})

carListRouter.post('/addCar', (req, res) => {
  const {placa, chassi, renavam, modelo, marca, ano} = req.body
  const currentContent = readFile()
  const id = process.env.NODE_ENV === 'test' ? 'test' : Math.random().toString(32).substring(2, 9)

  currentContent.push({id, placa, chassi, renavam, modelo, marca, ano})
  writeFile(currentContent)
  res.status(201).send({placa, chassi, renavam, modelo, marca, ano})
})

carListRouter.put('/editCar/:id', (req, res) => {
  const { id } = req.params
  const { placa, chassi, renavam, modelo, marca, ano } = req.body
  const currentContent = readFile()

  const selectedItem = currentContent.findIndex((item) => item.id === id)

  const { id: cId, placa: cPlaca, chassi: cChassi, renavam: cRenavam, modelo: cModelo, marca: cMarca, ano: cAno } = currentContent[selectedItem]  

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

  res.status(200).send(newObject)
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