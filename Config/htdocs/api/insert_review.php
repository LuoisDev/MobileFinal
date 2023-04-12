<?php
include '../services/Review_service.php';

$service = new ReviewService();

$idreview=$_POST['idreview'];
$email=$_POST['email'];
$name=$_POST['name'];
$hinh=$_POST['hinh'];
$time=$_POST['time'];
$message=$_POST['message'];
$ratenumber=$_POST['ratenumber'];
$matruyen=$_POST['matruyen'];

$result= $service->insert($idreview,$email,$name,$hinh,$time,$message,$ratenumber,$matruyen);
// $response= $service-> getAllReview($email,$matruyen);
// echo json_encode(array( "status" => true,"message" => "Thêm thành công" , "review" => $response) );
echo json_encode(array( "status" => true,"message" => "Thêm thành công" ) );

?>
