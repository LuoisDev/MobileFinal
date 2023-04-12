<?php
include '../db/DbConnect.php';
class LikeService
{
	private $db;
	function __construct(){
		$this->db = new DBConnect();
	}
    function checkExistlikeTruyen($email,$matruyen){
        $sql = "SELECT email FROM liketruyen WHERE email = '$email' AND matruyen='$matruyen'";
        return $this->db->query($sql);
    }
    function deleteLike($email,$matruyen){
        $sql_notlike = "DELETE FROM liketruyen WHERE email = '$email' AND matruyen='$matruyen'";
        return $this->db->query($sql_notlike);
    }
    function getLike($email,$matruyen){
        $sql = "SELECT * FROM liketruyen WHERE email = '$email' AND matruyen='$matruyen'";
        return $this->db->select($sql);
    }
	function insertLike($idlike,$email,$time,$matruyen){
		$sql="INSERT INTO liketruyen (idlike,email,time,matruyen)  VALUES ('$idlike','$email','$time','$matruyen')";
		return $this->db->query($sql);
	}
    function getLikeByMatruyen($matruyen){
        $sql = "SELECT * FROM liketruyen WHERE  matruyen='$matruyen'";
        return $this->db->select($sql);
    }
   
}
?>