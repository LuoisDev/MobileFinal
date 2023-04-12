<?php
include '../services/Truyen_service.php';

$service = new TruyenService();
$matruyen=$_POST['matruyen'];
$luottruycap=$_POST['luottruycap'];
// $maloai=$_POST['maloai'];


$result= $service->updateAccess($matruyen,$luottruycap);
// $response= $service-> getAccess($matruyen);
echo json_encode(array( "status" => true,"message" => "Sửa thành công" ) );

?>



 