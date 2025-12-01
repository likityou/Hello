<?php

//เลขที่บัญชีธนาคาร ทำ marking
function pdpa_bank_en($a) {
  $b = preg_replace('/\s+/', '', $a);
  $b = preg_replace('/-+/', '', $b);
  return substr($b, 0, 4) . 'XXX' . substr($b, -3);
}

//เลขที่บัญชีธนาคาร ยกเลิก marking
function pdpa_bank_de($a) {
  return preg_replace('/\s+/', '', $a);
}



//เลขบัตรประชาชน ทำ marking
function pdpa_pop_en($a) {
  return 'XXXXXXXXX' . substr(preg_replace('/\s+/', '', $a), -4);
}

//เลขบัตรประชาชน ยกเลิก marking
function pdpa_pop_de($a) {
  return preg_replace('/\s+/', '', $a);
}



//เลขบัตรcredit card ทำ marking
function pdpa_credit_debit_en($a) {
  return substr(preg_replace('/\s+/', '', $a), 0, 6) . 'XXXXXX' . substr(preg_replace('/\s+/', '', $a), -4);
}

//เลขบัตรcredit card ยกเลิก marking
function pdpa_credit_debit_de($a) {
  return preg_replace('/\s+/', '', $a);
}




//อีเมล card ทำ marking
function pdpa_email_en($a) {
  $b = explode('@', preg_replace('/\s+/', '', $a));
  return substr($b[0], 0, 4) . 'X@XXX.XXX';
}

//อีเมล card ยกเลิก marking
function pdpa_email_de($a) {
  return preg_replace('/\s+/', '', $a);
}



//เบอร์มือถือ ทำ marking
function pdpa_mobile_en($a) { //0877958010 => 087xxx8010
  $a = preg_replace('/\s+/', '', $a);
  $b = substr($a, 0, 3) . 'XXX' . substr($a, 6, 10);
  return $b;
}

//เบอร์มือถือ ยกเลิก marking
function pdpa_mobile_de($a) { //67XXX2458 => 670452458
  return preg_replace('/\s+/', '', $a);
}



//ชื่อ นามสกุล ทำ marking
function pdpa_name_en($a) {
  $a = preg_replace('/\s{3}/', ' ', $a);
  $a = preg_replace('/\s{2}/', ' ', $a);
  $a = trim($a);
  $b = explode(' ', $a);
  if (count($b) == 3) {
    $fname = $b[1];
  } else {
    $fname = $b[0];
  }
  return $fname . ' XXXXX';
}


//ชื่อ นามสกุล ยกเลิก marking
function pdpa_name_de($a) {
  return $a;
}




//account num ทำ marking
function pdpa_accountnum_en($a) { //67 045 2458 => 67XXX2458
  $a = preg_replace('/\s+/', '', $a);
  $b = substr($a, 0, 2) . 'XXX' . substr($a, 5, 9);
  return $b;
}

//account num ยกเลิก marking
function pdpa_accountnum_de($a) { //67XXX2458 => 670452458
  return preg_replace('/\s+/', '', $a);
}

?>