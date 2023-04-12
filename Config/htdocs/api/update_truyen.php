<?php
include '../services/Truyen_service.php';

$service = new TruyenService();
$matruyen=$_POST['matruyen'];
$tentruyen=$_POST['tentruyen'];
$hinhtruyen=$_POST['hinhtruyen'];
$mota=$_POST['mota'];
$gia=$_POST['gia'];
$maloai=$_POST['maloai'];
// $maloai=$_POST['maloai'];


$result= $service->update_truyen($matruyen,$tentruyen,$hinhtruyen,$mota,$gia,$maloai);
// $response= $service-> getAllTruyen($maloai);
echo json_encode(array( "status" => true,"message" => "Sửa thành công" ) );

?>



 