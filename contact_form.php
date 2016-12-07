<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL); ini_set('display_errors', 'On');
$form_info[0] = $_POST['first_name'];
$form_info[1] = $_POST['last_name'];
$form_info[2] = $_POST['email'];
$form_info[3] = $_POST['phone'];
$form_info[4] = $_POST['message'];

	$message = "Name: ".$form_info[0]." ".$form_info[1];
	$message .= "Email: ".$form_info[2]."\n\n";
	$message .= "Phone: ".$form_info[3]."\n\n";
	$message .= "Message: ".$form_info[4]."\n\n";
	$headers="From: contact@swervtechnologies.com\r\n"; 
	$subject = "New Contact - Swerv Website";
	$to_address = "contact@swervtechnologies.com";

	mail("$to_address","$subject","$message" ,"$headers");
	echo "success";

?>