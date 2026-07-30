const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico limpo
let historicoNumeros = [34, 11, 10, 33, 23, 9, 2, 6, 22, 15];

// Rota para receber o número que você enviar
app.get('/api/inserir', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    if (historicoNumeros[0] !== num) {
      historicoNumeros.unshift(num);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
    res.json({ status: "sucesso", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
  } else {
    res.status(400).json({ erro: "Número inválido. Use de 0 a 36." });
  }
});

// A rota que a Lovable vai ler
app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    provedor: "Playtech Live",
    mesa: "Roleta Brasileira",
    status: "online",
    ultimoNumero: historicoNumeros[0],
    historico: historicoNumeros,
    atualizadoEm: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ status: 'API Ativa', endpoint: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
