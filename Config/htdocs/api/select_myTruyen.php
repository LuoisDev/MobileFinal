<?php
include '../services/truyen_service.php';
$service = new TruyenService();
$matruyen=$_POST['matruyen'];


$response=$service->getTruyen($matruyen);

echo json_encode(array( "status" => true,"message" => "Thành công" , "truyen" => $response) );

?>