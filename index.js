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

// Rota para atualizar o número (via link direto)
app.get('/api/atualizar', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    if (estadoMesa.ultimoNumero !== num) {
      estadoMesa.historico.unshift(num);
      if (estadoMesa.historico.length > 50) estadoMesa.historico.pop();
      estadoMesa.ultimoNumero = num;
    }
  }
  res.redirect('/painel');
});

// API que a Lovable consome
app.get('/api/roleta-brasileira', (req, res) => {
  res.json(estadoMesa);
});

// Painel visual interativo para você clicar nos números enquanto joga
app.get('/painel', (req, res) => {
  let botoesHtml = '';
  for (let i = 0; i <= 36; i++) {
    let cor = (i === 0) ? 'green' : ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(i) ? 'red' : 'black');
    botoesHtml += `<a href="/api/atualizar?num=${i}" style="display:inline-block;width:50px;height:50px;line-height:50px;text-align:center;margin:5px;background:${cor};color:white;font-weight:bold;font-size:18px;text-decoration:none;border-radius:5px;">${i}</a>`;
  }

  res.send(`
    <html>
      <head><title>Painel de Controle - Roleta</title></head>
      <body style="font-family:Arial;text-align:center;background:#111;color:white;padding:20px;">
        <h1>Painel de Controle da Roleta</h1>
        <h3>Último Número Atual: <span style="color:yellow;font-size:30px;">${estadoMesa.ultimoNumero}</span></h3>
        <p>Clique no número que saiu na mesa da 1pra1:</p>
        <div style="max-width:500px;margin:0 auto;">${botoesHtml}</div>
        <br><br>
        <p><a href="/api/roleta-brasileira" target="_blank" style="color:#00ffff;">Ver JSON da API (Lovable)</a></p>
      </body>
    </html>
  `);
});

app.get('/', (req, res) => {
  res.redirect('/painel');
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
