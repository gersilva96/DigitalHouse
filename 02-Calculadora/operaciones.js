let objetoOperaciones = {
    sumar: (operandos) => operandos.reduce((acum,num) => acum + num),
    restar: (operandos) => operandos.reduce((acum,num) => acum - num),
    multiplicar: (operandos) => operandos.reduce((acum,num) => acum * num),
    dividir: (operandos) => operandos.reduce((acum,num) => acum / num),
}

module.exports = objetoOperaciones;