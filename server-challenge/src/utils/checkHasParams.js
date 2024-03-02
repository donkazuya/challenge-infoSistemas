const checkHasBodyParams = (placa, chassi, renavam, modelo, marca, ano) => {
  const resPlaca = placa && placa.trim().length === 8
  const resChassi = chassi && !!chassi.trim().length
  const resRenavam = renavam && typeof renavam === 'number' 
  const resModelo = modelo && !!modelo.trim().length
  const resMarca = marca && !!marca.trim().length
  const resAno = ano && typeof ano === 'number' && ano > 1900

  return resPlaca && resChassi && resRenavam && resModelo && resMarca && resAno
}

const checkHasRouterParams = (id) => {
  return id && !!id.trim().length
}

const returnError = (content, status, res)  => {
  const error = new Error(content)
    error.status = status
    res.status(status).send(content)
    
}

module.exports = {checkHasBodyParams, checkHasRouterParams, returnError}