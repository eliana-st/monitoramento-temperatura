// Importa o módulo 'mqtt' e os arquivos locais
const mqtt = require('mqtt')
const config = require('./config')
const { verificarStatus } = require('./temperatura')

// Cria e inicializa a conexão com o broker MQTT
const cliente = mqtt.connect(config.broker)

cliente.on('connect', () => {
  console.log('Painel conectado ao MQTT!')

  // Realiza a inscrição (subscribe) no tópico da sala
  cliente.subscribe(
    config.topico,
    { qos: 1 },
    (erro, concedidos) => {
      if (erro) {
        console.log('Erro ao assinar o tópico:', erro)
        return
      }
      console.log('Assinatura realizada:', concedidos)
    }
  )
})

cliente.on('message', (topico, mensagem) => {
  try {
    const dados = JSON.parse(mensagem.toString())
    const status = verificarStatus(dados.temperatura)

    console.log('-----------------------------------------')
    console.log('Tópico:', topico)
    console.log('Sensor:', dados.sensorId)
    console.log(`Temperatura: ${dados.temperatura} °${dados.unidade}`)
    console.log('Horário:', dados.timestamp)

    if (status === 'ALTA') {
      console.log('ALERTA: Temperatura ACIMA do limite (28 °C)!')
    } else if (status === 'BAIXA') {
      console.log('ALERTA: Temperatura ABAIXO do limite (18 °C)!')
    } else {
      console.log('Status: Temperatura NORMAL')
    }
  } catch (erro) {
    console.log('Erro ao ler mensagem JSON:', erro.message)
  }
})

cliente.on('error', (erro) => {
  console.log('Erro MQTT:', erro.message)
})

cliente.on('reconnect', () => {
  console.log('Painel tentando reconectar...')
})