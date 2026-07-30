const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let historicoNumeros = [];

function validarNumero(numero) {
    const n = Number(numero);

    if (Number.isInteger(n) && n >= 0 && n <= 36) {
        return n;
    }

    return null;
}

app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "API da Roleta Brasileira"
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        ultimoNumero: historicoNumeros[0] ?? null,
        quantidade: historicoNumeros.length,
        timestamp: new Date()
    });
});

app.get("/api/numero", (req, res) => {
    res.json({
        numero: historicoNumeros[0] ?? null
    });
});

app.get("/api/roleta-brasileira", (req, res) => {
    res.json({
        ultimoNumero: historicoNumeros[0] ?? null,
        historico: historicoNumeros
    });
});

app.post("/api/enviar", (req, res) => {

    const numero = validarNumero(req.body.numero);

    if (numero === null) {
        return res.status(400).json({
            success: false,
            erro: "Número inválido"
        });
    }

    if (historicoNumeros[0] !== numero) {

        historicoNumeros.unshift(numero);

        if (historicoNumeros.length > 50) {
            historicoNumeros.pop();
        }

    }

    res.json({
        success: true,
        ultimoNumero: numero,
        historico: historicoNumeros
    });

});

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
