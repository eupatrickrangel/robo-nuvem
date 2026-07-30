const express = require('express');
const app = express();
const fetch = require('node-fetch'); // Necessário para buscar dados externos
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [34, 11, 10, 33, 23, 9, 2, 6, 22, 15];

// Função autónoma que roda no Railway a cada 20 segundos buscando dados reais atualizados
setInterval(async () => {
  try {
    // Exemplo de consulta a uma rota pública de monitoramento de roletas
    const resposta = await fetch('https://api.casinos-stats-helper.com/api/live-roulette/brazilian'); // (ou a fonte de dados que indexa a mesa)
    const dados = await resposta.json();
    
    if (dados && dados.ultimoNumero) {
      if (historicoNumeros[0] !== dados.ultimoNumero) {
        historicoNumeros.unshift(dados.ultimoNumero);
        if (historicoNumeros.length > 50) historicoNumeros.pop();
      }
    }
  } catch (e) {
    // Sistema de segurança: se a API externa falhar temporariamente, mantém a estabilidade do servidor
    console.log("Aguardando próximo ciclo de sincronização...");
  }
}, 20000);

// Rota oficial consumida pela Lovable
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
  res.json({ status: 'API Autónoma Ativa', endpoint: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor autónomo rodando na porta ' + port);
});
