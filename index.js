const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let estadoMesa = {
  provedor: "Playtech Live",
  mesa: "Roleta Brasileira",
  casino: "1pra1.bet.br",
  ultimoNumero: 14,
  historico: [14, 7, 32, 18, 3, 22, 9, 31, 14, 2]
};

// Rota para atualizar via GET (facilita o envio direto pelo script do navegador)
app.get('/api/atualizar', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    if (estadoMesa.ultimoNumero !== num) {
      estadoMesa.historico.unshift(num);
      if (estadoMesa.historico.length > 50) estadoMesa.historico.pop();
      estadoMesa.ultimoNumero = num;
    }
  }
  res.json({ status: "sucesso", ultimo: estadoMesa.ultimoNumero, historico: estadoMesa.historico });
});

// Rota principal para a Lovable consumir
app.get('/api/roleta-brasileira', (req, res) => {
  res.json(estadoMesa);
});

app.get('/', (req, res) => {
  res.json({ status: 'online', sistema: 'Sincronizador Playtech Live' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
