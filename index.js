const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [12, 7, 32, 19, 3, 26, 0, 32, 15, 19, 4];

// Ciclo automático imersivo (roda sozinho na nuvem 24h, sem PC ligado)
setInterval(() => {
  try {
    const numerosRoleta = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    const novoNum = numerosRoleta[Math.floor(Math.random() * numerosRoleta.length)];
    
    if (historicoNumeros[0] !== novoNum) {
      historicoNumeros.unshift(novoNum);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
  } catch (err) {
    console.error("Erro ignorado para manter estabilidade");
  }
}, 30000); // Atualiza de forma autónoma a cada 30 segundos

// Rota única consumida pela Lovable
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
    res.status(500).json({ erro: "Erro interno" });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'API Automática Ativa' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor automático rodando na porta ' + port);
});
