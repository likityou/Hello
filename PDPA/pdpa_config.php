<?php
  $pdpa_server="xxxx";
  $pdpa_user="xxxx";
  $pdpa_pass="xxxx";
  $pdpa_db="xxxx";
  try{
    $conn= new PDO("mysql:host=$pdpa_server;dbname=$pdpa_db;charset=utf8",$pdpa_user,$pdpa_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  }catch(PDOException $e){
    echo $e->getMessage();
    exit();
  }
?>