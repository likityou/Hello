/*
  ==============================
  PDPA Library version 0.7
  ==============================
  
  คุณสมบัติของ PDPA Library
  1. รองรับการทำ Masking Solution แบบคลิก ณ จุดที่ต้องการ 
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

    let pdpa_x = document.querySelectorAll(".pdpa");
    let pdpa_y = [];

    function do_pdpa() {
      for (i = 0; i < pdpa_x.length; i++) {
        let j = i
        if (pdpa_x[i].classList.contains("pdpa_accountnum")) {
          pdpa_y[i] = pdpa_accountnum_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_accountnum_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_mobile")) {
          pdpa_y[i] = pdpa_mobile_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_mobile_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_name")) {
          pdpa_y[i] = pdpa_name_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_name_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_email")) {
          pdpa_y[i] = pdpa_email_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_email_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_credit_debit")) {
          pdpa_y[i] = pdpa_credit_debit_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_credit_debit_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_pop")) {
          pdpa_y[i] = pdpa_pop_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_pop_en(pdpa_x[i].innerHTML);
        } else if (pdpa_x[i].classList.contains("pdpa_bank")) {
          pdpa_y[i] = pdpa_bank_de(pdpa_x[i].innerHTML);
          pdpa_x[i].innerHTML = pdpa_bank_en(pdpa_x[i].innerHTML);
        }
        pdpa_x[i].style.cursor = "pointer";
        pdpa_x[i].setAttribute("pdpa_value_old", pdpa_y[i]);
        pdpa_x[i].setAttribute("pdpa_i", i);
        pdpa_x[i].addEventListener("click", function () {
          pdpa_x[j].innerHTML = this.getAttribute('pdpa_value_old')
          for (k = 0; k < pdpa_x.length; k++) {
            if (j != k) {
              if (pdpa_x[k].classList.contains("pdpa_accountnum")) {
                pdpa_y[k] = pdpa_accountnum_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_accountnum_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_mobile")) {
                pdpa_y[k] = pdpa_mobile_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_mobile_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_name")) {
                pdpa_y[k] = pdpa_name_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_name_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_email")) {
                pdpa_y[k] = pdpa_email_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_email_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_credit_debit")) {
                pdpa_y[k] = pdpa_credit_debit_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_credit_debit_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_pop")) {
                pdpa_y[k] = pdpa_pop_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_pop_en(pdpa_x[k].innerHTML);
              } else if (pdpa_x[k].classList.contains("pdpa_bank")) {
                pdpa_y[k] = pdpa_bank_de(pdpa_x[k].innerHTML);
                pdpa_x[k].innerHTML = pdpa_bank_en(pdpa_x[k].innerHTML);
              }
            }
          }
        })
      }
    }

    do_pdpa()

  }

  pdpa_begin();

});