<?php
include '../services/Account_service.php';
$service = new AccountService();

$oldpassword=$_POST['oldpassword'];
$email=$_POST['email'];
$newpassword=$_POST['newpassword'];

$resultEmail=$service->checkMyPassword($email,$oldpassword);
if(mysqli_num_rows($resultEmail)!=0){
  $result=$service->update_account($email,$newpassword);
  $response= $service-> getMyAccount($email,$newpassword);
  echo json_encode(array( "status" => true,"message" => "Đúng mật khẩu cũ" , "users" => $response) );
} else{
  
  $response= $service-> getMyAccount($email,$oldpassword);
  echo json_encode(array( "status" => false,"message" => "Sai mật khẩu cũ" , "users" => $response) );
}

?>