<?php
  session_start();
  $emp_code=$_SESSION['jas_employee_id'];//รหัสพนักงาน
  $emp_name=$_SESSION['jas_thai_fullname'];//ชื่อพนักงาน
  $emp_email=$_SESSION['jas_email'];// อีเมล์พนักงาน
  
  require('pdpa_config.php');

  $application=$_POST['application'];//ชื่อ application

  $dateis=date("Y-m-d");
  $timeis=date("H:i:s");

  $sql="insert into log(emp_code,emp_name,emp_email,dateis,timeis,application) values(?,?,?,?,?,?)";
  $result=$conn->prepare($sql);
  $result->execute(array("$emp_code","$emp_name","$emp_email","$dateis","$timeis","$application"));

?>