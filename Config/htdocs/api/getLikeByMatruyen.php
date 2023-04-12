<?php
include '../services/Like_service.php';
$service = new LikeService();
$matruyen=$_POST['matruyen'];
$response=$service->getLikeByMatruyen($matruyen);
echo json_encode(array( "status" => true,"message" => "Thành công" , "liketruyen" => $response) );

?>