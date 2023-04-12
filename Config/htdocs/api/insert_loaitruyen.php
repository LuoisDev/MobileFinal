<?php
include '../services/Loaitruyen_service.php';

$service = new AccountService();

$tenloai=$_POST['tenloai'];
$hinhloai=$_POST['hinhloai'];

$result= $service->insert_loaitruyen($tenloai,$hinhloai);
// $response= $service-> getAllLoaiTruyen();
echo json_encode(array( "status" => true,"message" => "Thêm thành công" ) );

?>



 