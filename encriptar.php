<?php
// Datos a encriptar
$data = [
    [
        "username" => "usuario1",
        "password" => "contraseña1"
    ]
];

// Convertir a formato JSON
$jsonData = json_encode($data);

// Clave secreta para encriptación (debe ser segura y guardada de forma segura)
$secretKey = "claveSecreta123";

// Encriptar los datos
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
$ciphertext = openssl_encrypt($jsonData, 'aes-256-cbc', $secretKey, 0, $iv);
$encryptedData = base64_encode($iv . $ciphertext);

// Guardar los datos en un archivo (o enviarlos de alguna manera segura)
file_put_contents('encrypted_data.json', $encryptedData);

// Para desencriptar los datos
$encryptedData = file_get_contents('encrypted_data.json');
$decodedData = base64_decode($encryptedData);
$iv = substr($decodedData, 0, openssl_cipher_iv_length('aes-256-cbc'));
$ciphertext = substr($decodedData, openssl_cipher_iv_length('aes-256-cbc'));
$decryptedData = openssl_decrypt($ciphertext, 'aes-256-cbc', $secretKey, 0, $iv);

// Convertir de JSON a arreglo asociativo
$decryptedArray = json_decode($decryptedData, true);

print_r($decryptedArray);
?>
