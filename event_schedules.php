<?php
// Start the session and include necessary files
session_start();
require_once 'db.php'; // connection to database
require_once 'vendor/autoload.php';

// Fetch events from database
$events = []; 
$query = "SELECT event_id, title, description, start_time, end_time, location FROM Events ORDER BY start_time ASC";
$result = $db->query($query);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

// Setting up Twig
$loader = new \Twig\Loader\FilesystemLoader('/home/stud/1/2378831/public_html/OpenDay/templates');
$twig = new \Twig\Environment($loader);

// Render the Twig template with events data
echo $twig->render('event_schedules.twig', ['events' => $events]);
?>
