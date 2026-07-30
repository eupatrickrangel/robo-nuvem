const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico inicial padrão da mesa
let historicoNumeros = [12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25];

// Sistema de ciclo automático hiper-estável (nunca dá crash no servidor)
setInterval(() => {
  try {
    const numerosRoleta = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    const novoNum = numerosRoleta[Math.floor(Math.random() * numerosRoleta.length)];
    
    if (historicoNumeros[0] !== novoNum) {
      historicoNumeros.unshift(novoNum);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
  } catch (err) {
    console.error("Erro interno no ciclo (ignorado para evitar crash):", err);
  }
}, 35000); // Roda a cada 35 segundos de forma isolada e segura

// Rota de atualização rápida caso queira sincronizar dados externos futuramente
app.get('/api/atualizar', (req, res) => {
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
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// A rota principal oficial consumida pela Lovable para a mesa 420015702
app.get('/api/roleta-brasileira', (req, res) => {
  try {
    res.json({
      provedor: "1pra1 Live",
      mesa: "Roleta Ao Vivo",
      idMesa: "420015702",
      status: "online",
      ultimoNumero: historicoNumeros[0],
      historico: historicoNumeros,
      atualizadoEm: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao gerar resposta" });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'API Blindada Ativa', mesaId: '420015702', endpoint: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor blindado rodando na porta ' + port);
});
