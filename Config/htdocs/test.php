<html>
<link rel="stylesheet" href="./css/loaitruyen.css" />

<body>
   <div class="container">
   <div id="menu"> 
		<ul> 
			<li><a href="#">Trang chủ</a></li> 
			<li><a href="#">Diễn đàn</a></li> 
			<li><a href="#">Tin tức</a></li> 
			<li><a href="#">Hỏi đáp</a></li> 
			<li><a href="#">Liên hệ</a></li> 
		</ul> 
	</div>

    <br />
    <br />
    <h1 class="title">Thêm loại truyện </h1>
    <div class="formthemloai">
        <form action="./api/insert_loaitruyen.php" method="post">
            <input type="text" placeholder="Nhập tên loại truyện" name="tenloai" class="input" /><br><br>
            <input type="text" placeholder="Nhập hình loại truyện" name="hinhloai" class="input" /><br><br>
            <input type="submit" value="Thêm" class="button" />
        </form>

    </div>

   </div>
</body>

</html>