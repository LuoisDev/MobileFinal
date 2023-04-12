<?php
include '../services/truyen_service.php';
$service = new TruyenService();
$matruyen=$_POST['matruyen'];
$response=$service->getAccess($matruyen);

echo json_encode(array( "status" => true,"message" => "Thành công" , "truyen" => $response) );

?>