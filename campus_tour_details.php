<?php
require_once 'vendor/autoload.php';

// Set up Twig environment
$loader = new \Twig\Loader\FilesystemLoader('/home/stud/1/2378831/public_html/OpenDay/templates');
$twig = new \Twig\Environment($loader, [
    'debug' => true  // Enable debug mode if needed, we will disable in production
]);

// Render the Twig template
echo $twig->render('campus_tour_details.twig');
?>
