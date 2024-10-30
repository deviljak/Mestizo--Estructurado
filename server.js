require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Agrega node-fetch para hacer solicitudes HTTP

const app = express();
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { nombre, telefono, asunto, correo, mensaje } = req.body;

  const data = {
    sender: { email: "servicios@mestizodiseno.com.ar" },
    to: [{ email: "hola@mestizodiseno.com.ar" }],
    replyTo: { email: correo },
    subject: asunto,
    htmlContent: `<p><strong>Nombre:</strong> ${nombre}</p>
                  <p><strong>Teléfono:</strong> ${telefono}</p>
                  <p><strong>Correo:</strong> ${correo}</p>
                  <p><strong>Mensaje:</strong><br>${mensaje}</p>`
  };

  fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => res.status(200).json({ message: "Correo enviado exitosamente." }))
  .catch(error => res.status(500).json({ message: "Error al enviar el correo.", error }));
});

app.listen(3000, () => console.log('Servidor funcionando en http://localhost:3000'));
