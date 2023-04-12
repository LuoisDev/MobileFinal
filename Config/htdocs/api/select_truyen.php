<?php
include '../services/truyen_service.php';
$service = new TruyenService();
$maloai=$_POST['maloai'];


$response=$service->getAllTruyen($maloai);

echo json_encode(array( "status" => true,"message" => "Thành công" , "truyen" => $response) );

?>