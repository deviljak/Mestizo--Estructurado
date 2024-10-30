document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Obtén los valores del formulario
    var nombre = document.querySelector('input[name="nombre"]').value;
    var telefono = document.querySelector('input[name="telefono"]').value;
    var asunto = document.querySelector('input[name="asunto"]').value;
    var correo = document.querySelector('input[name="correo"]').value;
    var mensaje = document.querySelector('textarea[name="mensaje"]').value;

    // Datos a enviar a Brevo
    var data = {
        sender: { email: "servicios@mestizodiseno.com.ar" }, // Tu correo verificado
        to: [{ email: "hola@mestizodiseno.com.ar" }], // El correo al que llegará el mensaje
        replyTo: { email: correo }, // Correo del usuario para las respuestas
        subject: `${asunto}`,
        htmlContent: `<p><strong>Nombre:</strong> ${nombre}</p>
                      <p><strong>Teléfono:</strong> ${telefono}</p>
                      <p><strong>Correo:</strong> ${correo}</p>
                      <p><strong>Mensaje:</strong><br>${mensaje}</p>`
    };

    // Realizar el envío usando Fetch a tu servidor
    fetch("/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Mostrar un mensaje de éxito
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = '<p>Correo enviado exitosamente.</p>';
        resultado.classList.add('show');
    })
    .catch(error => {
        // Mostrar un mensaje de error
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = '<p>Error al enviar el correo.</p>';
        resultado.classList.add('show');
        console.error('Error:', error);
    });
});
