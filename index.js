import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.json());

let ultimoNumero = null;

app.get('/api/numero', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ numero: ultimoNumero });
});

app.post('/api/atualizar', (req, res) => {
  const { numero } = req.body;
  if(numero !== undefined) {
    ultimoNumero = numero;
    console.log("Atualizado: " + numero);
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando");
  iniciarRoboNuvem();
});

async function iniciarRoboNuvem() {
  while(true) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto('https://1pra1.bet.br', {waitUntil: 'networkidle2', timeout: 60000});
      
      while(true) {
        const frames = page.frames();
        for(const f of frames) {
          try {
            const n = await f.evaluate(() => {
              const els = document.querySelectorAll('[class*="history"] [class*="number"], [class*="recent"] [class*="ball"], [class*="results"] span, .pie-history-item');
              for(const el of els) {
                const t = el.innerText ? el.innerText.trim() : '';
                if(/^([0-9]|[12][0-9]|3[0-6])$/.test(t)) return parseInt(t, 10);
              }
              return null;
            });
            if(n !== null) {
              ultimoNumero = n;
            }
          } catch(e){}
        }
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch(err) {
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}
