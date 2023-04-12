<?php
include '../services/Truyen_service.php';

$service = new TruyenService();
$matruyen=$_POST['matruyen'];
$maloai=$_POST['maloai'];

$result= $service->delete_truyen($matruyen);
// $response= $service-> getAllTruyen($maloai);
echo json_encode(array( "status" => true,"message" => "Xóa thành công" ) );

?>



 