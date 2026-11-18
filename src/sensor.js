// Importa o módulo 'mqtt' e os arquivos locais
const mqtt = require('mqtt')
const config = require('./config')
const { obterTemperatura, verificarStatus } = require('./temperatura')

// Cria e inicializa a conexão com o broker MQTT
const cliente = mqtt.connect(config.broker)

cliente.on('connect', () => {
  console.log('Sensor conectado ao MQTT!')

  // Envia dados a cada 3 segundos
  const intervalo = setInterval(async () => {
    try {
      const temperatura = await obterTemperatura()
      const status = verificarStatus(temperatura)

      const leitura = {
        sensorId: 'sensor-sala-01',
        temperatura: temperatura,
        unidade: 'C',
        timestamp: new Date().toISOString(),
        status: status
      }

      const payload = JSON.stringify(leitura)

      cliente.publish(
        config.topico,
        payload,
        { qos: 1 },
        (erro) => {
          if (erro) {
            console.error('Erro ao publicar:', erro)
          } else {
            console.log('Mensagem enviada:', payload)
          }
        }
      )
    } catch (erro) {
      console.log('Falha ao ler temperatura:', erro)
    }
  }, config.intervalo)

  // Encerramento organizado ao apertar Ctrl+C no terminal
  process.on('SIGINT', () => {
    clearInterval(intervalo)
    cliente.end(() => {
      console.log('Sensor desconectado!')
      process.exit()
    })
  })
})

cliente.on('error', (erro) => {
  console.error('Erro MQTT:', erro.message)
})

cliente.on('reconnect', () => {
  console.log('Sensor tentando reconectar...')
})