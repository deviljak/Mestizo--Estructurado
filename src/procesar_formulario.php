<?php
// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $asunto = $_POST['asunto'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    // Verificar que los campos no estén vacíos
    if (empty($nombre) || empty($telefono) || empty($asunto) || empty($correo) || empty($mensaje)) {
        echo json_encode(["status" => "error", "message" => "Por favor, completa todos los campos."]);
        exit;
    }

    // Configurar los datos para la solicitud de Brevo
    $data = [
        "sender" => ["name" => $nombre, "email" => "web@mestizodiseno.com.ar"], // Email del remitente
        "to" => [
            ["email" => "hola@mestizodiseno.com.ar", "name" => "Destinatario"]
        ],
        "subject" => $asunto,
        "htmlContent" => "<html><body>
                            <h2>Nuevo mensaje de contacto</h2>
                            <p><strong>Nombre:</strong> $nombre</p>
                            <p><strong>Teléfono:</strong> $telefono</p>
                            <p><strong>Email:</strong> $correo</p>
                            <p><strong>Mensaje:</strong> $mensaje</p>
                          </body></html>"
    ];

    // Configurar cURL para enviar la solicitud a la API de Brevo
    $ch = curl_init("https://api.brevo.com/v3/smtp/email");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "api-key: xkeysib-dc0437a557f900532f741f275bf04af41e42b14f6eba5ab0bd98835d88125691"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Ejecutar la solicitud
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    // Manejo de la respuesta
    if ($error) {
        echo json_encode(["status" => "error", "message" => "Error al enviar el mensaje: " . $error]);
    } else {
        echo json_encode(["status" => "success", "message" => "¡Mensaje enviado exitosamente!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "El formulario no se envió correctamente."]);
}
?>
