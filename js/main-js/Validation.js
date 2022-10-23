/**
Validation
+ Tài khoản tối đa 4 - 6 ký số, không để trống -ok
+ Tên nhân viên phải là chữ, không để trống -ok
+ Email phải đúng định dạng, không để trống -ok
+ mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
để trống -ok pass demo: Tw@1234
+ Ngày làm không để trống, định dạng mm/dd/yyyy -ok
+ Lương cơ bản 1 000 000 - 20 000 000, không để trống -ok
+ Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)-ok
+ Số giờ làm trong tháng 80 - 200 giờ, không để trống -ok
 */
function Validation() {
  // Kiểm tra rỗng
  this.checkEmpty = function (inputVal, spanID, message) {
    if (inputVal.trim() != "") {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ và thông báo cho user lên UI
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  // Tài khoản (check rỗng, trùng, định dạng)
  this.checkAccount = function (inputVal, spanID, message) {
    var pattern = /^[0-9]{4,6}$/;
    if (inputVal.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      // Ko hợp lệ
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };
  this.checkExistedUser = function (inputVal, spanID, message, mangNV) {
    var isExist = false;
    isExist = mangNV.some(function (nv) {
      // return kết quả của biểu thức so sánh
      return nv.taiKhoan === inputVal.replaceAll(" ", ""); // thay thế loại " " sang ""
    });
    if (isExist) {
      // mã bị trùng => dữ liệu không hợp lệ
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    } else {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
  };

  // Tên nhân viên
  this.checkName = function (inputVal, spanID, message) {
    var pattern =
      /^[a-z  A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
    if (inputVal.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };

  // Email
  this.checkEmail = function (inputVal, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputVal.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };
  // Mật khẩu
  this.checkPass = function (inputVal, spanID, message) {
    var pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    if (inputVal.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };
  // Ngày làm
  this.checkDate = function (inputVal, spanID, message) {
    var pattern =
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (inputVal.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };
  // Lương cơ bản
  this.checkSalary = function (inputVal, spanID, message) {
    var salary = Number(inputVal.replaceAll(" ", ""));
    if (salary >= 1000000 && salary <= 20000000) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };

  // Chức vụ hợp lệ
  this.checkTitle = function (selectID, spanID, message) {
    // chọn option vị trí đầu tiên, là vị trí 0
    var jobTitle = document.getElementById(selectID).selectedIndex;
    if (jobTitle != 0) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };

  // Số giờ làm
  this.checkHour = function (inputVal, spanID, message) {
    if (
      Number(inputVal.replaceAll(" ", "")) >= 80 &&
      Number(inputVal.replaceAll(" ", "")) <= 200
    ) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
  };
}
