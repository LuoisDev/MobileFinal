<?php
include '../services/GioHang_service.php';

$service = new GioHangService();


$id=$_POST['id'];
$matruyen=$_POST['matruyen'];
$tentruyen=$_POST['tentruyen'];
$hinhtruyen=$_POST['hinhtruyen'];
$gia=$_POST['gia'];
$email=$_POST['email'];
$name=$_POST['name'];
$timeoder=$_POST['timeoder'];
$soluong=$_POST['soluong'];
$result= $service->insertCart($id,$matruyen,$tentruyen,$hinhtruyen,$gia,$email,$name,$timeoder,$soluong);
// $response= $service-> getAllMyCart($email,$matruyen);
echo json_encode(array( "status" => true,"message" => "Thêm thành công" ) );

?>


