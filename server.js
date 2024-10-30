// server.js
const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
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

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      res.status(200).json({ message: 'Correo enviado exitosamente.' });
    } else {
      res.status(response.status).json({ message: 'Error al enviar el correo.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
