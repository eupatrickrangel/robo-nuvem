const express = require('express');
const https = require('https');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [14, 7, 32, 18, 3];

function validarNumero(n) {
  const num = parseInt(n, 10);
  return !isNaN(num) && num >= 0 && num <= 36 ? num : 0;
}

// Simulação de atualização automática interna na nuvem (independente de PC ou telemóvel)
setInterval(() => {
  // Gera um número novo aleatório ou busca da API do provedor
  const novoNum = Math.floor(Math.random() * 37);
  if (historicoNumeros[0] !== novoNum) {
    historicoNumeros.unshift(novoNum);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
}, 5000);

app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'API Autonoma na Nuvem' });
});

app.get('/api/status', (req, res) => {
  res.json({ online: true, timestamp: new Date() });
});

app.get('/api/numero', (req, res) => {
  res.json({ numero: validarNumero(historicoNumeros[0]) });
});

app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    ultimoNumero: validarNumero(historicoNumeros[0]),
    historico: historicoNumeros.map(validarNumero)
  });
});

app.post('/api/enviar', (req, res) => {
  const { numero } = req.body;
  if (numero !== undefined) {
    const numValidado = validarNumero(numero);
    if (historicoNumeros[0] !== numValidado) {
      historicoNumeros.unshift(numValidado);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
    return res.json({ success: true, ultimo: numValidado, historico: historicoNumeros });
  }
  res.status(400).json({ error: 'Invalido' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor autônomo rodando na porta ' + port);
});
