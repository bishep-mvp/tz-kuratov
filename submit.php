<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

if (!empty($name) && !empty($email) && !empty($message)) {
    $stmt = $pdo->prepare("INSERT INTO comments (name, email, message) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $message]);

    echo json_encode(['status' => 'success', 'message' => 'Комментарий успешно добавлен']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Все поля обязательны']);
}