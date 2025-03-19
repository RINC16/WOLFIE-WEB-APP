<?php
session_start(); // Start the session

// Include necessary files
require_once 'vendor/autoload.php';
require_once 'email_config.php'; // Load email settings

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'db.php';  // Database connection

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader('templates');
$twig = new Environment($loader);

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Validate Form Data
    $firstName = trim($_POST['first_name']);
    $lastName = trim($_POST['last_name']);
    $email = trim($_POST['email']);

    // Initialize errors array
    $errors = [];

    // --- Validation logic (example) --- 
    if (empty($firstName)) {
        $errors['first_name'] = 'First name is required.';
    }
    if (empty($lastName)) {
        $errors['last_name'] = 'Last name is required.';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email address.';
    }

    // If there are errors, display the form with error messages
    if (!empty($errors)) {
        echo $twig->render('register.twig', ['errors' => $errors, 'firstName' => $firstName, 'lastName' => $lastName, 'email' => $email]);
        exit; // Stop further execution
    }

    // 2. Check if Email Already Exists
    $stmt = $db->prepare("SELECT id FROM members WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $errors['email'] = 'Email address already registered.';
        echo $twig->render('register.twig', ['errors' => $errors, 'firstName' => $firstName, 'lastName' => $lastName, 'email' => $email]);
        $stmt->close();
        exit;
    }
    $stmt->close();

    // 3. Generate Unique Registration Code
    $registrationCode = bin2hex(random_bytes(32)); // Generate a secure random code

    // 4. Store User Data in Database
    $stmt = $db->prepare("INSERT INTO members (first_name, last_name, email, registration_code) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $registrationCode);

    if ($stmt->execute()) {
        // 5. Send Verification Email
        $verificationLink = "verify.php?code=" . $registrationCode;  // we will have to create a verification link....work in progress
        $subject = "Open Day Registration Verification";
        $message = "Please click the following link to verify your registration: " . $verificationLink;
        $headers = "From: noreply@yourdomain.com"; // Change to your domain

        // ---  Mail sending logic (using mail() function) ---
        if (mail($email, $subject, $message, $headers)) {
            $_SESSION['registration_email'] = $email; // Store email in session
            header("Location: registration_success.php"); // Redirect to success page
            exit;
        } else {
            // Handle email sending error (log it, display a message)
            echo "Error sending verification email.";
        }
    } else {
        // Handle database error
        echo "Database error: " . $stmt->error;
    }
    $stmt->close();
    $db->close();
} else {
    // Display the registration form
    echo $twig->render('register.twig');
}
?>
