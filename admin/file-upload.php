<?php
// File upload handler
header('Content-Type: application/json');

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error']);
    exit;
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
$fileType = $_FILES['file']['type'];

if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'File type not allowed']);
    exit;
}

// Create uploads directory if it doesn't exist
if (!file_exists('uploads')) {
    mkdir('uploads', 0755);
}

// Generate unique filename
$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '.' . $extension;
$destination = 'uploads/' . $filename;

// Move uploaded file
if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
    // Save file info to files.json
    $fileInfo = [
        'filename' => $filename,
        'originalName' => $_FILES['file']['name'],
        'type' => $fileType,
        'size' => $_FILES['file']['size'],
        'uploadDate' => date('Y-m-d H:i:s'),
        'url' => '/' . $destination
    ];
    
    // Add to files.json
    $filesData = [];
    if (file_exists('data/files.json')) {
        $filesData = json_decode(file_get_contents('data/files.json'), true) ?: [];
    }
    
    $filesData[] = $fileInfo;
    file_put_contents('data/files.json', json_encode($filesData, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'file' => $fileInfo]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
}
?>