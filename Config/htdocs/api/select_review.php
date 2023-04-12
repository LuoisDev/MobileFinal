<?php
include '../services/Review_service.php';
$service = new ReviewService();
$matruyen=$_POST['matruyen'];
$response=$service->getAllReview($matruyen);
echo json_encode(array( "status" => true,"message" => "Thành công" , "review" => $response) );

?>