<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['userName']) && isset($input['userEmail'])) {
        $userName = trim($input['userName']);
        $userEmail = trim($input['userEmail']);
        $style = isset($input['style']) ? trim($input['style']) : '';
        $time = isset($input['time']) ? trim($input['time']) : '';
        $timestamp = date('Y-m-d H:i:s');
        
        // Create CSV line
        $csvLine = sprintf(
            '"%s","%s","%s","%s","%s"' . PHP_EOL,
            $timestamp,
            $userName,
            $userEmail,
            $style,
            $time
        );
        
        // Append to file
        $filename = 'quiz_submissions.csv';
        
        // Create header if file doesn't exist
        if (!file_exists($filename)) {
            $header = '"Timestamp","Name","Email","Style","Time"' . PHP_EOL;
            file_put_contents($filename, $header);
        }
        
        // Append data
        file_put_contents($filename, $csvLine, FILE_APPEND | LOCK_EX);
        
        echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
