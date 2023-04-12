<?php
include '../services/Like_service.php';
$service = new LikeService();


$email=$_POST['email'];
$matruyen=$_POST['matruyen'];

$resultLike=$service->checkExistlikeTruyen($email,$matruyen);
if(mysqli_num_rows($resultLike)!=0){
    $mess="có trong danh sách like";
    $response= $service-> getLike($email,$matruyen);
  echo json_encode(array( "status" =>true,"message" => "Có trong danh sách" , "liketruyen" => $response) );
} else{
  $mess="nếu không có trong bảng like thì insert like";
  $response= $service-> getLike($email,$matruyen);
  echo json_encode(array( "status" => false,"message" => "Không có" , "liketruyen" => $response) );
}

?>



 