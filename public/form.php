<?php
    use PHPMailer\PHPMailer\PHPMailer;
	
	require 'Exception.php';
	require 'PHPMailer.php';
	require 'SMTP.php';

	$fName = 'Почта: ' . $_POST['user_email'];

	$message =  $fName.$fPhone;
	$setFrom='noreply@sro.kz';
	$address='Almaty-ws@mail.ru';
	
	$email = new PHPMailer();
	$email->SetFrom($setFrom, "Сайт Pehlivan.kz");
	$email->Subject   = 'Заявка на уведомления с сайта Pehlivan.kz'; 
	$email->Body      = $message;
	$email->CharSet = "utf-8";
	$email->AddAddress($address);

	return $email->Send();
?>

