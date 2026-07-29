const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.error('Erro nao capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeicao nao tratada:', reason);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Robo rodando com sucesso na nuvem',
    ultimosNumeros: [7, 12, 3, 32, 18],
    timestamp: new Date()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(Servidor rodando com sucesso na porta );
});