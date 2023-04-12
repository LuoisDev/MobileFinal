<?php
include '../services/GioHang_service.php';

$service = new GioHangService();
$matruyen=$_POST['matruyen'];
$email=$_POST['email'];
$soluong=$_POST['soluong'];



$result= $service->updateSoluong($email,$matruyen,$soluong);
// $response= $service-> getAllMyCart($email,$matruyen);
echo json_encode(array( "status" => true,"message" => "Sửa thành công") );

?>



 