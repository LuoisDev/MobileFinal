<?php
include '../db/DbConnect.php';
class ReviewService
{
	private $db;
	function __construct(){
		$this->db = new DBConnect();
	}
    
    function getAllReview($matruyen){
        $sql = "SELECT * FROM review WHERE matruyen='$matruyen'";
        return $this->db->select($sql);
    }
	function insert($idreview,$email,$name,$hinh,$time,$message,$ratenumber,$matruyen){
		$sql="INSERT INTO review (idreview,email,name,hinh,time,message,ratenumber,matruyen)  VALUES ('$idreview','$email','$name','$hinh','$time','$message','$ratenumber','$matruyen')";
		return $this->db->query($sql);
	}
}
?>