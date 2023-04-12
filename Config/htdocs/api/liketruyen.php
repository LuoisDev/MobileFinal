<?php
include '../services/Like_service.php';
$service = new LikeService();

$idlike=$_POST['idlike'];
$email=$_POST['email'];
$time=$_POST['time'];
$matruyen=$_POST['matruyen'];

$resultLike=$service->checkExistlikeTruyen($email,$matruyen);
if(mysqli_num_rows($resultLike)!=0){
    $mess="có  like";
    $service->deleteLike($email,$matruyen);
    // $response= $service-> getLike($email,$matruyen);
  echo json_encode(array( "status" => false,"message" => "Đã bỏ like" ) );
} else{
  $mess="nếu không có trong bảng like thì insert like";
  $result= $service->insertLike($idlike,$email,$time,$matruyen);
  // $response= $service-> getLike($email,$matruyen);
  echo json_encode(array( "status" => true,"message" => "Like thành công" ) );
}

?>



 