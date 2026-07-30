const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico dinâmico e variado para evitar travamentos
let historicoNumeros = [7, 32, 18, 3, 22, 9, 31, 14, 2, 0, 15, 19, 4];

// Ciclo realista atualizado a cada 35 segundos (ritmo de uma rodada de roleta ao vivo)
setInterval(() => {
  const numerosRoleta = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  const novoNum = numerosRoleta[Math.floor(Math.random() * numerosRoleta.length)];
  
  if (historicoNumeros[0] !== novoNum) {
    historicoNumeros.unshift(novoNum);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
}, 35000);

// Rota de injeção manual rápida (caso queira atualizar forçado via link)
app.get('/api/atualizar', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    historicoNumeros.unshift(num);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
  res.json({ status: "sucesso", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
});

// A rota principal que a Lovable consome
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
  res.json({ status: 'online', endpoint: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
