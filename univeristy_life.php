<?php
require_once 'vendor/autoload.php';

// Twig environment
$loader = new \Twig\Loader\FilesystemLoader('/home/stud/1/2378831/public_html/OpenDay/templates');
$twig = new \Twig\Environment($loader, [
    'debug' => true
]);

// content section for University Life 
$universityLife = [
    'accommodation' => [
        'title' => 'Accommodation',
        'description' => 'Information about different accommodation options for students, including halls of residence and private housing.',
        'image' => 'images/accommodation.jpg'
    ],
    'clubs' => [
        'title' => 'Clubs and Societies',
        'description' => 'Details about the various clubs and societies available to students, covering a wide range of interests.',
        'image' => 'images/clubs.jpg'
    ],
    'support' => [
        'title' => 'Student Support',
        'description' => 'Information about the support services available to students, such as academic support, financial aid, and health services.',
        'image' => 'images/support.jpg'
    ],
    // ...will add more sections if needed
];

// Rendering the Twig template with university life data
echo $twig->render('university_life.twig', ['universityLife' => $universityLife]);
?>
