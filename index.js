const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [14, 7, 32, 18, 3];

// Validador de numero de roleta (0 a 36)
function validarNumero(n) {
  const num = parseInt(n, 10);
  return !isNaN(num) && num >= 0 && num <= 36 ? num : 0;
}

app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'Robo sincronizado com Lovable' });
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

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando com sucesso na porta ' + port);
});
