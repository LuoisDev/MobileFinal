<?php
include '../services/GioHang_service.php';

$service = new GioHangService();
$matruyen=$_POST['matruyen'];
$email=$_POST['email'];
$gia=$_POST['gia'];



$result= $service->updateGia($email,$matruyen,$gia);
// $response= $service-> getAllMyCart($email,$matruyen);
echo json_encode(array( "status" => true,"message" => "Sửa thành công" ) );

?>



 