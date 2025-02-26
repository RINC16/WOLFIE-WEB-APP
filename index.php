<?php
require_once 'vendor/autoload.php';

// Set up Twig environment
$loader = new \Twig\Loader\FilesystemLoader('/home/stud/1/2378831/public_html/OpenDay/templates');
$twig = new \Twig\Environment($loader);

// Render the template
echo $twig->render('index.twig');
?>
