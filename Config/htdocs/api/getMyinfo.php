<?php

include '../services/Account_service.php';
$service = new AccountService();
$email=$_POST['email'];
$response= $service-> getMyInfo($email);
echo json_encode(array( "status" => true,"message" => "Thành công" , "users" => $response) );
?>


