<?php
include '../db/DbConnect.php';

class GioHangService
{
	private $db;
	
	function __construct(){
		$this->db = new DBConnect();
	}
	
	function getAllMyCart($email,$matruyen){
		return $this->db->select("SELECT * FROM giohang WHERE email='$email' AND matruyen='$matruyen'");
	}

	function getAllCartByEmail($email){
		return $this->db->select("SELECT * FROM giohang WHERE email='$email' ");

	}
    
    function insertCart($id,$matruyen,$tentruyen,$hinhtruyen,$gia,$email,$name,$timeoder,$soluong){
        $sql="INSERT INTO giohang(id,matruyen,tentruyen,hinhtruyen,gia,email,name,timeoder,soluong) VALUES ('$id','$matruyen','$tentruyen','$hinhtruyen','$gia','$email','$name','$timeoder','$soluong')";
       return $this->db->query($sql); 
    }
	function updateSoluong($email,$matruyen,$soluong){
		$sql = "UPDATE giohang SET soluong='$soluong' WHERE email = '$email' AND matruyen= '$matruyen'";//AND pwd='$pwd'
		return $this->db->query($sql);
	}
	function updateGia($email,$matruyen,$gia){
		$sql = "UPDATE giohang SET gia='$gia' WHERE email = '$email' AND matruyen= '$matruyen'";//AND pwd='$pwd'
		return $this->db->query($sql);
	}


    function delete_item_giohang($id){
		$sql = "DELETE FROM giohang WHERE id = '$id'";
		return $this->db->query($sql);
    }

	

	
}
?>