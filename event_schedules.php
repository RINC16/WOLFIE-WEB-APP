<?php
// Secure session start
session_set_cookie_params([
    'Secure' => true, 
    'HttpOnly' => true, 
    'SameSite' => 'Strict'
]);
session_start();
session_regenerate_id(true);

// Include necessary files and check connection
require_once 'db.php'; 
require_once 'vendor/autoload.php';

if (!$db) {
    die("Database connection failed!");
}

// Secure database query with prepared statements
$stmt = $db->prepare("SELECT event_id, title, description, start_time, end_time, location FROM Events ORDER BY start_time ASC");
if (!$stmt) {
    error_log("Database error: " . $db->error); // Log the error
    die("Database error!"); // Generic error message for security
}
$stmt->execute();
$result = $stmt->get_result();
$events = $result->fetch_all(MYSQLI_ASSOC);

// Set security headers
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: no-referrer-when-downgrade");
header("Content-Security-Policy: default-src 'self'");

// Initialize Twig securely
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader);

// Render the Twig template with events data
echo $twig->render('event_schedules.twig', ['events' => $events]);
?>
