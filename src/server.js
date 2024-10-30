const express = require('express');
const fetch = require('node-fetch'); // Asegúrate de instalar node-fetch si no lo tienes
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/send-email', (req, res) => {
    const data = req.body; // Obtén los datos del cuerpo de la solicitud
    const apiKey = process.env.BREVO_API_KEY;

    fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey // Usa la clave API desde el archivo .env
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        res.status(200).json({ message: 'Correo enviado exitosamente', result });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al enviar el correo', error });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
