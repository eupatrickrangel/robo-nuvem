const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico inicial simulando a mesa da Playtech Brasileira
let historicoNumeros = [14, 7, 32, 18, 3, 22, 9, 31, 14, 2];

// Simulação sincronizada com o tempo real de giros da Playtech Live (~38 a 45 segundos por rodada)
setInterval(() => {
  const novoNum = Math.floor(Math.random() * 37);
  if (historicoNumeros[0] !== novoNum) {
    historicoNumeros.unshift(novoNum);
    if (historicoNumeros.length > 50) historicoNumeros.pop();
  }
}, 40000);

app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    mesa: 'Roleta Brasileira Playtech Live',
    versao: '2.0' 
  });
});

app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    provedor: 'Playtech Live',
    mesa: 'Roleta Brasileira',
    ultimoNumero: historicoNumeros[0],
    historico: historicoNumeros,
    atualizadoEm: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor da Roleta Playtech rodando na porta ' + port);
});
