const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Estado atual da mesa da Playtech Brasileira (1pra1)
let estadoMesa = {
  provedor: "Playtech Live",
  mesa: "Roleta Brasileira",
  casino: "1pra1.bet.br",
  ultimoNumero: null,
  historico: []
};

// Rota para receber os dados reais enviados pelo seu conector/extensão
app.post('/api/atualizar', (req, res) => {
  const { numero, historico } = req.body;
  if (numero !== undefined) {
    estadoMesa.ultimoNumero = numero;
  }
  if (Array.isArray(historico)) {
    estadoMesa.historico = historico;
  }
  res.json({ status: "sucesso", atualizado: estadoMesa });
});

// Rota principal que a Lovable vai consumir
app.get('/api/roleta-brasileira', (req, res) => {
  res.json(estadoMesa);
});

app.get('/', (req, res) => {
  res.json({ status: 'online', sistema: 'Sincronizador Playtech Live' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
