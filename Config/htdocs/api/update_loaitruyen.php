<?php
include '../services/Loaitruyen_service.php';

$service = new AccountService();
$maloai=$_POST['maloai'];
$tenloai=$_POST['tenloai'];
$hinhloai=$_POST['hinhloai'];

$result= $service->update_loaitruyent($maloai,$tenloai,$hinhloai);
// $response= $service-> getAllLoaiTruyen();
echo json_encode(array( "status" => true,"message" => "Sửa thành công" ) );

?>



 