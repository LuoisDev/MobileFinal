<?php
include '../services/Loaitruyen_service.php';

$service = new AccountService();
$maloai=$_POST['maloai'];


$result= $service->delete_loai($maloai);
// $response= $service-> getAllLoaiTruyen();
echo json_encode(array( "status" => true,"message" => "Xóa thành công" ) );

?>



 