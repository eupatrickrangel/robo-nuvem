const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico inicial para a Immersive Roulette
let historicoNumeros = [14, 7, 32, 19, 3, 26, 0, 32, 15, 19, 4];

// Rota para atualizar o número (caso queira injetar novos resultados)
app.get('/api/evolution-atualizar', (req, res) => {
  try {
    const num = parseInt(req.query.num);
    if (!isNaN(num) && num >= 0 && num <= 36) {
      if (historicoNumeros[0] !== num) {
        historicoNumeros.unshift(num);
        if (historicoNumeros.length > 50) historicoNumeros.pop();
      }
      return res.json({ status: "sucesso", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
    }
    res.status(400).json({ erro: "Número inválido" });
  } catch (e) {
    res.status(500).json({ erro: "Erro interno" });
  }
});

// A Rota oficial que a Lovable vai ler
app.get('/api/roleta-evolution', (req, res) => {
  try {
    res.json({
      provedor: "Evolution Gaming",
      mesa: "Immersive Roulette",
      status: "online",
      ultimoNumero: historicoNumeros[0],
      historico: historicoNumeros,
      atualizadoEm: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ erro: "Erro ao gerar resposta" });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'API Immersive Roulette Ativa', endpoint: '/api/roleta-evolution' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
