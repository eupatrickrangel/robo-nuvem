const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico realista simulando o fluxo da mesa Playtech Brasileira
let historicoNumeros = [14, 7, 32, 18, 3, 22, 9, 31, 14, 2, 5, 24, 16, 33];

// Atualizador automático baseado no tempo médio de uma rodada de roleta (~38 segundos)
setInterval(() => {
  const roletaSet = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  const randomIndex = Math.floor(Math.random() * roletaSet.length);
  const novoNum = roletaSet[randomIndex];

  if (historicoNumeros[0] !== novoNum) {
    historicoNumeros.unshift(novoNum);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
}, 38000);

// Rota para inserção manual rápida ou via automação externa se desejar
app.get('/api/atualizar', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    historicoNumeros.unshift(num);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
  res.json({ status: "sucesso", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
});

// Endpoint oficial consumido pela Lovable
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
  res.json({ status: 'API Ativa', rota: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
