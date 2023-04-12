<?php
include '../db/DbConnect.php';

class AccountService
{
	private $db;
	
	function __construct(){
		$this->db = new DBConnect();
	}
	
	function getAllAccount(){
		return $this->db->select("SELECT * FROM users");
	}
	function getMyInfo($email){
		$sql="SELECT * FROM users WHERE email='$email' ";
		return $this->db->select($sql);
	}
	function checkLoginAccount($email,$password){
		$sql="SELECT * FROM users WHERE email='$email' AND password='$password'";
		return $this->db->query($sql);
	}

	function getMyAccount($email,$password){
		$sql="SELECT * FROM users WHERE email='$email' AND password='$password'";
		return $this->db->select($sql);
	}
	
	function checkExistUser($email){
		$sql="SELECT * FROM users WHERE email='$email'";
		return $this->db->query($sql);	
	}
	

    function insert_account($name,$email,$password,$hinh){
        $sql="INSERT INTO users(name,email,password,hinh) VALUES ('$name','$email','$password','$hinh')";
       return $this->db->query($sql);
    }

	function checkMyPassword($email,$password){
		$sql="SELECT * FROM users WHERE email='$email' AND password='$password'";
		return $this->db->query($sql);
	}
	function update_account($email,$newPassword){
		$sql = "UPDATE users SET password='$newPassword' WHERE email = '$email'";//AND pwd='$pwd'
		return $this->db->query($sql);
    }

	
}
?>