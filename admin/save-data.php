<?php
// Secure this file properly in production!
header('Content-Type: application/json');

// Basic validation
if (!isset($_GET['file']) || empty($_GET['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file specified']);
    exit;
}

// Security: Restrict filenames to known files only
$allowedFiles = ['projects.json', 'blog.json', 'services.json', 'education.json', 'messages.json', 'profile.json'];
$filename = $_GET['file'];

if (!in_array($filename, $allowedFiles)) {
    http_response_code(403);
    echo json_encode(['error' => 'File not allowed']);
    exit;
}

// Get JSON input
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON);

// Validate JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Create data directory if it doesn't exist
if (!file_exists('data')) {
    mkdir('data', 0755);
}

// Write the data
$result = file_put_contents("data/$filename", json_encode($data, JSON_PRETTY_PRINT));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file']);
    exit;
}

echo json_encode(['success' => true, 'bytes' => $result]);
?>