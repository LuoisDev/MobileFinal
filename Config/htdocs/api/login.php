<?php

include '../services/Account_service.php';
$service = new AccountService();

$email=$_POST['email'];
$password=$_POST['password'];
$resultCheck= $service-> checkLoginAccount($email,$password);

if(mysqli_num_rows($resultCheck)!=0){
    $response= $service-> getMyAccount($email,$password);
    echo json_encode(array( "status" => true,"message" => "Đăng nhập thành công" , "users" => $response) );
  } else{
    echo json_encode(array( "status" => false,"message" => "Đăng nhập thất bại" , "users" => []) );
  }
?>


