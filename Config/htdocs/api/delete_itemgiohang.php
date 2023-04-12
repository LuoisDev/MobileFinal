<?php
include '../services/GioHang_service.php';

$service = new GioHangService();
$id=$_POST['id'];
$email=$_POST['email'];

$result= $service->delete_item_giohang($id);
$response= $service-> getAllCartByEmail($email);
echo json_encode(array( "status" => true,"message" => "Xóa thành công" ) );

?>
