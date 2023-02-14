const express = require('express')

const app = express()

const operators = {
  suma: '+',
  resta: '-',
  multiplicacion: '*',
  division: '/'
}

function areNumbers (req, res, next) {
  const [oper, ...numbers] = Object.values(req.params)
  if (operators[oper] && numbers.every(num => !isNaN(num))) {
    return next()
  }
  if (!operators[oper]) return res.status(401).send('Operador incorrecto')
  return res.status(401).send('Solo se permiten numeros')
}

function operate (req) {
  const [, num1, num2] = Object.values(req.params).map(num => parseInt(num))
  const operator = operators[req.params.op]
  let value = 0
  switch (operator) {
    case '+' : value = num1 + num2
      break
    case '-' : value = num1 - num2
      break
    case '/' : value = parseFloat(num1 / num2)
      break
    case '*' : value = num1 * num2
      break
  }
  return value.toString()
}

app.get('/:op/:num1/:num2', areNumbers, (req, res) => {
  res.send(operate(req))
})

app.listen(3000, console.log('listening in http://localhost:3000'))
