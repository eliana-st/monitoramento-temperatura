// Configurações gerais do projeto MQTT
const config = {
  broker: 'mqtt://localhost:1884',
  topico: 'laboratorio/sala1/temperatura',
  intervalo: 3000,
  tempMinima: 18,
  tempMaxima: 28
}

module.exports = config