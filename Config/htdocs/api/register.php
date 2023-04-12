<?php
include '../services/Account_service.php';
$service = new AccountService();

$name=$_POST['name'];
$email=$_POST['email'];
$password=$_POST['password'];
$hinh=$_POST['hinh'];



$resultEmail=$service->checkExistUser($email);
if(mysqli_num_rows($resultEmail)!=0){
  $response= $service-> getMyAccount($email,$password);
  echo json_encode(array( "status" => false,"message" => "Email đã tồn tại!" , "users" => $response) );
} else{
  
  $result= $service->insert_account($name,$email,$password,$hinh);
  $response= $service-> getMyAccount($email,$password);
  echo json_encode(array( "status" => true,"message" => "Đăng kí thành công" , "users" => $response) );
}

?>



 