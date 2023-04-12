<?php
include '../services/truyen_service.php';
$service = new TruyenService();
$response=$service->getAllTruyenP();

echo json_encode(array( "status" => true,"message" => "Thành công" , "loaitruyen" => $response) );

?>