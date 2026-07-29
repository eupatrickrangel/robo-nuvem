const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Histórico em memória na nuvem
let historicoNumeros = [14, 7, 32, 18, 3];

// Rota para a Lovable buscar os dados atualizados
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Robo sincronizado na nuvem',
    ultimosNumeros: historicoNumeros,
    ultimoNumero: historicoNumeros[0],
    timestamp: new Date()
  });
});

// Rota para atualizar o histórico (quando um número novo sai)
app.post('/atualizar', (req, res) => {
  const { numero } = req.body;
  if (numero !== undefined) {
    historicoNumeros.unshift(numero);
    if (historicoNumeros.length > 20) historicoNumeros.pop();
    return res.json({ success: true, ultimoNumero: numero, historico: historicoNumeros });
  }
  res.status(400).json({ error: 'Numero nao fornecido' });
});

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando com sucesso na porta ' + port);
});
