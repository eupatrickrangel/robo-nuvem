const https = require('https');

// Simula um gerador de numeros ou busca de API externa
const numeroAleatorio = Math.floor(Math.random() * 37);

const data = JSON.stringify({ numero: numeroAleatorio });

const req = https.request({
  hostname: 'robo-nuvem-production.up.railway.app',
  path: '/api/enviar',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  console.log(Status: );
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
