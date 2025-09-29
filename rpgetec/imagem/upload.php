<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With'); 
header('Content-Type: application/json; charset=utf-8');  

  $dbhost = "localhost";
  $dbuser = "root";
  $dbpass = "";
  $db = "image_upload";
  
  $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %sn". $conn -> error);
  
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
  

  if($_FILES['photo'])
  {
      $photo_name = $_FILES["photo"]["name"];
      $photo_tmp_name = $_FILES["photo"]["tmp_name"];

     
          //MOVE FILE TO SERVER
          $random_name = rand(1000,1000000)."-".$photo_name;
          $upload_name = "http://127.0.0.1/imagem/".$random_name; 
          $upload_name = preg_replace('/s+/', '-', $upload_name);

          if(move_uploaded_file($_FILES["photo"]["tmp_name"],"img/" .$_FILES["photo"]["name"])) {
              //file uploaded to server
              $sql = "INSERT INTO images(image,image_text) VALUES ( '$photo_name', '$upload_name' )";

            
              
              mysqli_query($conn,$sql);
          }
         


      

  }


?>