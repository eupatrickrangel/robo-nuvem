const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico específico da Roleta Brasileira
let historicoNumeros = [14, 7, 32, 18, 3, 22, 9, 31, 14, 2];

// Rota para atualizar o número exato que saiu na mesa certa (pode ser usada por qualquer automação ou link rápido)
app.get('/api/inserir', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    if (historicoNumeros[0] !== num) {
      historicoNumeros.unshift(num);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
  }
  res.json({ status: "atualizado", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
});

// A rota oficial que a Lovable vai ler
app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    provedor: "Playtech Live",
    mesa: "Roleta Brasileira",
    idMesa: "40013837",
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
