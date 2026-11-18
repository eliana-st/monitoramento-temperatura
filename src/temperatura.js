


const config = require('./config')

// Função com Callback no padrão (erro, leitura)
function gerarTemperatura(callback) {
  // Simula atraso do sensor entre 500ms e 1500ms
  const atraso = 500 + Math.floor(Math.random() * 1000)

  setTimeout(() => {
    // Simula chance de erro na leitura
    const falha = Math.random() < 0.1

    if (falha) {
      callback('erro na leitura do sensor', null)
    } else {
      // Gera temperatura entre 10.0 e 40.0 com 1 casa decimal
      const leitura = (100 + Math.floor(Math.random() * 301)) / 10
      callback(null, leitura)
    }
  }, atraso)
}

// Função que retorna Promise 
function obterTemperatura() {
  return new Promise((resolve, reject) => {
    gerarTemperatura((erro, leitura) => {
      if (erro) {
        reject(erro)
      } else {
        resolve(leitura)
      }
    })
  })
}

// Função para verificar a faixa de temperatura (18°C a 28°C)
function verificarStatus(temperatura) {
  if (temperatura > config.tempMaxima) {
    return 'ALTA'
  }
  if (temperatura < config.tempMinima) {
    return 'BAIXA'
  }
  return 'NORMAL'
}

module.exports = {
  gerarTemperatura,
  obterTemperatura,
  verificarStatus
}