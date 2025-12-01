/*
  ==============================
  PDPA Library version 0.7
  ==============================
  
  คุณสมบัติของ PDPA Library
  1. รองรับการทำ Masking Solution แบบกำหนดเวลาการแสดง 
  2. มีปุ่ม Eye View สำหรับแสดงข้อมูลแบบเต็ม
  3. รองรับการแสดงข้อมูล หมายเลขโทรศัพท์มือถือ
  4. รองรับการแสดงข้อมูล หมายเลขบัญชีลูกค้า (Account Number)
  5. รองรับการแสดงข้อมูล บัตร Credit/Debit Card
  6. รองรับการแสดงข้อมูล หมายเลขบัตรประชาชน
  7. รองรับการแสดงข้อมูล บัญชีธนาคาร
  8. รองรับการแสดงข้อมูล อีเมล์ลูกค้า
  9. รองรับการแสดงข้อมูล ชื่อ นามสกุล
  
  ข้อมูลอ้างอิง : เอกสาร GL-PDO-008 แนวปฏิบัติการเปิดเผยข้อมูลส่วนบุคคล.pdf
*/


window.addEventListener("DOMContentLoaded", function () {

  function pdpa_begin() {

    function pdpa_bank_en(a) { //418-266-9348 => 4182XXX348
      b = a.replace(/\s+/g, "").replace(/-+/g, "");
      return b.substring(0, 4) + 'XXX' + b.slice(-3);
    }

    function pdpa_bank_de(a) { //4182XXX348 => 418-266-9348
      return a.replace(/\s+/g, "");
    }

    function pdpa_pop_en(a) { //1234567890123 => XXXXXXXXX0123
      return 'XXXXXXXXX' + a.replace(/\s+/g, "").slice(-4);
    }

    function pdpa_pop_de(a) { //XXXXXXXXX0123 => 1234567890123
      return a.replace(/\s+/g, "");
    }

    function pdpa_credit_debit_en(a) { //4033 7512 3456 7890 => 403375XXXXXX7890
      return a.replace(/\s+/g, "").substring(0, 6) + 'XXXXXX' + a.slice(-4);
    }

    function pdpa_credit_debit_de(a) { //403375XXXXXX7890 => 4033751234567890
      return a.replace(/\s+/g, "");
    }

    function pdpa_email_en(a) { //ABCDE@gmail.com => ABCDx@xxx.xxx.xxx
      b = a.replace(/\s+/g, "").split('@');
      return b[0].substring(0, 4) + 'X@XXX.XXX';
    }

    function pdpa_email_de(a) { //ABCDx@xxx.xxx.xxx => ABCDE@gmail.com
      return a.replace(/\s+/g, "");
    }

    function pdpa_mobile_en(a) { //0877958010 => 087xxx8010
      a = a.replace(/\s+/g, "").replace(/-+/g, "");
      b = a.substring(0, 3) + 'XXX' + a.substring(6, 10);
      return b;
    }

    function pdpa_mobile_de(a) { //67XXX2458 => 670452458
      return a.replace(/\s+/g, "");
    }

    function pdpa_name_de(a) {
      return a;
    }

    function pdpa_name_en(a) {
      a = a.replace(/\s{3}/g, " ")
      a = a.replace(/\s{2}/g, " ")
      a = a.trim()
      b = a.split(" ");
      if (b.length == 3) {
        fname = b[1];
      } else {
        fname = b[0];
      }
      return fname + ' XXXXX';
    }

    function pdpa_accountnum_en(a) { //67 045 2458 => 67XXX2458
      a = a.replace(/\s+/g, "");
      b = a.substring(0, 2) + 'XXX' + a.substring(5, 9);
      return b;
    }

    function pdpa_accountnum_de(a) { //67XXX2458 => 670452458
      return a.replace(/\s+/g, "");
    }

    let pdpa_x = document.querySelectorAll(".pdpa_accountnum");
    let pdpa_x2 = document.querySelectorAll(".pdpa_name");
    let pdpa_x3 = document.querySelectorAll(".pdpa_mobile");
    let pdpa_x4 = document.querySelectorAll(".pdpa_email");
    let pdpa_x5 = document.querySelectorAll(".pdpa_credit_debit");
    let pdpa_x6 = document.querySelectorAll(".pdpa_pop");
    let pdpa_x7 = document.querySelectorAll(".pdpa_bank");
    let pdpa_eye_view = document.querySelectorAll(".pdpa_eye_view");
    let pdpa_y = [];
    let pdpa_y2 = [];
    let pdpa_y3 = [];
    let pdpa_y4 = [];
    let pdpa_y5 = [];
    let pdpa_y6 = [];
    let pdpa_y7 = [];
    let pdpa_start = true;
    let pdpa_use_time = 1;
    let pdpa_use_time_unit = 3000; //แก้ไขได้ ตั้งเวลาเท่าไหร่ ความหมาย 1000 = 1 second 

    function do_pdpa_bank_de() {
      for (i = 0; i < pdpa_x7.length; i++) {
        pdpa_x7[i].innerHTML = pdpa_y7[i]
      }
    }

    function do_pdpa_bank_en() {
      for (i = 0; i < pdpa_x7.length; i++) {
        pdpa_y7[i] = pdpa_bank_de(pdpa_x7[i].innerHTML);
        pdpa_x7[i].innerHTML = pdpa_bank_en(pdpa_x7[i].innerHTML);
      }
    }

    function do_pdpa_pop_de() {
      for (i = 0; i < pdpa_x6.length; i++) {
        pdpa_x6[i].innerHTML = pdpa_y6[i]
      }
    }

    function do_pdpa_pop_en() {
      for (i = 0; i < pdpa_x6.length; i++) {
        pdpa_y6[i] = pdpa_pop_de(pdpa_x6[i].innerHTML);
        pdpa_x6[i].innerHTML = pdpa_pop_en(pdpa_x6[i].innerHTML);
      }
    }

    function do_pdpa_credit_debit_de() {
      for (i = 0; i < pdpa_x5.length; i++) {
        pdpa_x5[i].innerHTML = pdpa_y5[i]
      }
    }

    function do_pdpa_credit_debit_en() {
      for (i = 0; i < pdpa_x5.length; i++) {
        pdpa_y5[i] = pdpa_credit_debit_de(pdpa_x5[i].innerHTML);
        pdpa_x5[i].innerHTML = pdpa_credit_debit_en(pdpa_x5[i].innerHTML);
      }
    }

    function do_pdpa_email_de() {
      for (i = 0; i < pdpa_x4.length; i++) {
        pdpa_x4[i].innerHTML = pdpa_y4[i]
      }
    }

    function do_pdpa_email_en() {
      for (i = 0; i < pdpa_x4.length; i++) {
        pdpa_y4[i] = pdpa_email_de(pdpa_x4[i].innerHTML);
        pdpa_x4[i].innerHTML = pdpa_email_en(pdpa_x4[i].innerHTML);
      }
    }

    function do_pdpa_mobile_de() {
      for (i = 0; i < pdpa_x3.length; i++) {
        pdpa_x3[i].innerHTML = pdpa_y3[i]
      }
    }

    function do_pdpa_mobile_en() {
      for (i = 0; i < pdpa_x3.length; i++) {
        pdpa_y3[i] = pdpa_mobile_de(pdpa_x3[i].innerHTML);
        pdpa_x3[i].innerHTML = pdpa_mobile_en(pdpa_x3[i].innerHTML);
      }
    }

    function do_pdpa_name_de() {
      for (i = 0; i < pdpa_x2.length; i++) {
        pdpa_x2[i].innerHTML = pdpa_y2[i]
      }
    }

    function do_pdpa_name_en() {
      for (i = 0; i < pdpa_x2.length; i++) {
        pdpa_y2[i] = pdpa_name_de(pdpa_x2[i].innerHTML);
        pdpa_x2[i].innerHTML = pdpa_name_en(pdpa_x2[i].innerHTML);
      }
    }

    function do_pdpa_accountnum_en() {
      for (i = 0; i < pdpa_x.length; i++) {
        pdpa_y[i] = pdpa_accountnum_de(pdpa_x[i].innerHTML);
        pdpa_x[i].innerHTML = pdpa_accountnum_en(pdpa_x[i].innerHTML);
      }
    }

    function do_pdpa_accountnum_de() {
      for (i = 0; i < pdpa_x.length; i++) {
        pdpa_x[i].innerHTML = pdpa_y[i]
      }
    }

    for (let i = 0; i < pdpa_eye_view.length; i++) {
      pdpa_eye_view[i].addEventListener("click", function () {
        if (pdpa_start == true) {
          do_pdpa_accountnum_de()
          do_pdpa_name_de()
          do_pdpa_mobile_de()
          do_pdpa_email_de()
          do_pdpa_credit_debit_de()
          do_pdpa_pop_de()
          do_pdpa_bank_de()
          pdpa_start = false;

          //begin save to log
          if (i == 0) {
            application = 'แก้ไขได้ ป้อนชื่อ application'
            try {
              let fd = new FormData();
              fd.append("application", application)
              fetch('pdpa_log.php', {
                method: 'POST',
                body: fd,
              })
            } catch (error) {
              console.log('have error', error);
            }
          }
          //end save to log

          if (pdpa_use_time == 1) {
            pdpa_eye_view[i].disabled = true
            setTimeout(() => {
              do_pdpa_accountnum_en()
              do_pdpa_name_en()
              do_pdpa_mobile_en()
              do_pdpa_email_en()
              do_pdpa_credit_debit_en()
              do_pdpa_pop_en()
              do_pdpa_bank_en()
              pdpa_eye_view[i].disabled = false
            }, pdpa_use_time_unit);
            pdpa_start = true;
          }
        } else {
          do_pdpa_accountnum_en()
          do_pdpa_name_en()
          do_pdpa_mobile_en()
          do_pdpa_email_en()
          do_pdpa_credit_debit_en()
          do_pdpa_pop_en()
          do_pdpa_bank_en()
          pdpa_start = true;
        }
      });
    }

    do_pdpa_accountnum_en()
    do_pdpa_name_en()
    do_pdpa_mobile_en()
    do_pdpa_email_en()
    do_pdpa_credit_debit_en()
    do_pdpa_pop_en()
    do_pdpa_bank_en()

  }

  pdpa_begin();

});