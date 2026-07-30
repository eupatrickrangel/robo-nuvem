const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico base
let historicoNumeros = [12, 35, 3, 26, 0, 32, 15, 19];

// Rota de Sincronização Real (Aqui é onde o número real entra na nuvem)
app.get('/api/sincronizar', (req, res) => {
  const num = parseInt(req.query.num);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    if (historicoNumeros[0] !== num) {
      historicoNumeros.unshift(num);
      if (historicoNumeros.length > 50) historicoNumeros.pop();
    }
    return res.json({ status: "sucesso", ultimoNumero: historicoNumeros[0], historico: historicoNumeros });
  }
  res.status(400).json({ erro: "Número inválido" });
});

// A rota oficial que a Lovable lê
app.get('/api/roleta-brasileira', (req, res) => {
  res.json({
    provedor: "1pra1 Live",
    mesa: "Roleta Ao Vivo",
    idMesa: "420015702",
    status: "online",
    ultimoNumero: historicoNumeros[0],
    historico: historicoNumeros,
    atualizadoEm: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ status: 'API Pronta para Sincronizar', endpoint: '/api/roleta-brasileira' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + port);
});
