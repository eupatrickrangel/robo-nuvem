const https = require("https");

const numero = process.argv[2];

if (!numero) {
    console.log("Uso:");
    console.log("node atualizar.js 17");
    process.exit();
}

const data = JSON.stringify({
    numero: Number(numero)
});

const options = {
    hostname: "robo-nuvem-production.up.railway.app",
    path: "/api/enviar",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {

    let body = "";

    res.on("data", chunk => body += chunk);

    res.on("end", () => {

        console.log("Status:", res.statusCode);
        console.log(body);

    });

});

req.on("error", console.error);

req.write(data);
req.end();
