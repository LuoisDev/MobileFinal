<?php
include '../services/GioHang_service.php';
$service = new GioHangService();
$email=$_POST['email'];
$matruyen=$_POST['matruyen'];
$response=$service->getAllMyCart($email,$matruyen);
echo json_encode(array( "status" => true,"message" => "Thành công" , "giohang" => $response) );

?>