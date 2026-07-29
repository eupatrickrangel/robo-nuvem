const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota principal para a Lovable consumir os dados do rob?
app.get('/', async (req, res) => {
  try {
    // Exemplo de automa??o/scraping com Puppeteer para o 1pra1bet
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Altere para o link real da p?gina de apostas se necess?rio
    await page.goto('https://www.1pra1bet.com', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Exemplo de extra??o de dados da tela (ajuste os seletores conforme sua estrutura)
    const numeros = await page.evaluate(() => {
      // Cole aqui a l?gica de extra??o dos n?meros da roleta se houver elementos espec?ficos
      return []; 
    });

    await browser.close();

    res.json({
      status: 'online',
      message: 'Robo a funcionar perfeitamente',
      ultimosNumeros: numeros,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'erro',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(Servidor rodando na porta );
});