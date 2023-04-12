<?php
include '../db/DbConnect.php';


class TruyenService
{
	private $db;
	
	function __construct(){
		$this->db = new DBConnect();
	}
	function getAllTruyen($maloai){
		return $this->db->select("SELECT * FROM truyen WHERE maloai='$maloai'");
	}
	
	function getAllTruyenP(){
		return $this->db->select("SELECT * FROM truyen");
	}
	
    function insert_truyen($tentruyen,$hinhtruyen,$mota,$gia,$maloai,$email){
        $sql="INSERT INTO truyen(tentruyen,hinhtruyen,mota,luottruycap,gia,maloai,email) VALUES ('$tentruyen','$hinhtruyen','$mota',0,'$gia','$maloai','$email')";
        return $this->db->query($sql);
    }
	function update_truyen($matruyen,$tentruyen,$hinhtruyen,$mota,$gia,$maloai){
		$sql = "UPDATE truyen SET tentruyen= '$tentruyen', hinhtruyen= '$hinhtruyen',mota='$mota',gia='$gia',maloai='$maloai' WHERE matruyen = '$matruyen'";
		return $this->db->query($sql);
    }

    function delete_truyen($matruyen){
		$sql = "DELETE FROM truyen WHERE matruyen = '$matruyen'";
		return $this->db->query($sql);
    }
	function getTruyen($matruyen){
		return $this->db->select("SELECT * FROM truyen WHERE matruyen='$matruyen'");
	}
	function getAccess($matruyen){
	  $sql="SELECT * FROM truyen WHERE matruyen='$matruyen'";
	  return $this->db->select($sql);
	}
	function updateAccess($matruyen,$luotruycap){
      $sql="UPDATE truyen SET luottruycap='$luotruycap' WHERE matruyen='$matruyen'";
	  return $this->db->query($sql);
	}

}
?>