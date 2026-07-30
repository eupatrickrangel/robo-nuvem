const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [14, 7, 32, 18, 3, 22, 9, 31, 14, 2];

setInterval(() => {
  const novoNum = Math.floor(Math.random() * 37);
  if (historicoNumeros[0] !== novoNum) {
    historicoNumeros.unshift(novoNum);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
}, 4000);

app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'API Roleta Ativa' });
});

app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    ultimoNumero: historicoNumeros[0],
    historico: historicoNumeros
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
