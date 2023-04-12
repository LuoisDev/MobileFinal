<?php
include '../services/Loaitruyen_service.php';
$service = new AccountService();
$response=$service->getAllLoaiTruyen();

echo json_encode(array( "status" => true,"message" => "Thành công" , "loaitruyen" => $response) );

?>