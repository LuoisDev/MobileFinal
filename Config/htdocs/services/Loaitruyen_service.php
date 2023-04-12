<?php
include '../db/DbConnect.php';


class AccountService
{
	private $db;
	
	function __construct(){
		$this->db = new DBConnect();
	}
	function getAllLoaiTruyen(){
		return $this->db->select("SELECT * FROM loaitruyen");
	}

    function insert_loaitruyen($tenloai,$hinhloai){
        $sql="INSERT INTO loaitruyen(tenloai,hinhloai) VALUES ('$tenloai','$hinhloai')";
        return $this->db->query($sql);
    }
	function update_loaitruyent($maloai,$tenloai,$hinhloai){
		$sql = "UPDATE loaitruyen SET tenloai= '$tenloai', hinhloai= '$hinhloai' WHERE maloai = '$maloai'";
		return $this->db->query($sql);
    }

    function delete_loai($maloai){
		
		$sqltruyen="DELETE FROM truyen WHERE maloai='$maloai'";
		$this->db->query($sqltruyen);
		$sql = "DELETE FROM loaitruyen WHERE maloai = '$maloai'";
		return $this->db->query($sql);
    }

}
?>