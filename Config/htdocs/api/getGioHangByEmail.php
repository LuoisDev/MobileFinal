<?php
include '../services/GioHang_service.php';
$service = new GioHangService();
$email=$_POST['email'];
$response=$service->getAllCartByEmail($email);
echo json_encode(array( "status" => true,"message" => "Thành công" , "giohang" => $response) );

?>