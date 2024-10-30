<?php
// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $asunto = $_POST['asunto'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    if (empty($nombre) || empty($telefono) || empty($asunto) || empty($correo) || empty($mensaje)) {
        echo json_encode(["success" => false, "message" => "Por favor, completa todos los campos."]);
        exit;
    }

    $data = [
        "sender" => ["name" => $nombre, "email" => "web@mestizodiseno.com.ar"],
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

    $ch = curl_init("https://api.brevo.com/v3/smtp/email");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "api-key: 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"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        echo json_encode(["success" => false, "message" => "Error al enviar el mensaje: " . $error]);
    } else {
        echo json_encode(["success" => true, "message" => "¡Mensaje enviado exitosamente!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "El formulario no se envió correctamente."]);
}
