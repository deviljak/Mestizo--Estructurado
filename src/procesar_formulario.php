<?php
// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start(); // Iniciar la sesión para almacenar el mensaje de estado

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $asunto = $_POST['asunto'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    if (empty($nombre) || empty($telefono) || empty($asunto) || empty($correo) || empty($mensaje)) {
        // Redirigir a la página de error si hay campos vacíos
        header("Location: /error.php");
        exit;
    }

    // Configurar y enviar los datos a la API de Brevo
    $data = [
        "sender" => ["name" => $nombre, "email" => "web@mestizodiseno.com.ar"],
        "to" => [["email" => "hola@mestizodiseno.com.ar", "name" => "Destinatario"]],
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
        // Redirigir a la página de error si ocurre un error
        header("Location: /error.html");
    } else {
        // Redirigir a la página de éxito si se envía correctamente
        header("Location: /exito.html");
    }
    exit;
}
?>
