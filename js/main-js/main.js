/**
 * Chứa các hàm xử lý tương tác UI
 */
//GLOBAL
var dsnv = new DanhSachNhanVien();
var validate = new Validation();
// Khi trang vừa chạy, mọi content trong form đã được clear
clearContent();
// Hàm rút gọn cú phát getElementByID
function getELE(id) {
  return document.getElementById(id);
}
function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV") != undefined) {
    dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
  }

  hienThiDS(dsnv.mangNV);
}
getLocalStorage();

// Clear nội dung khi bấm nut thêm nhân viên
function clearContent() {
  var formTxt = document.querySelectorAll("#myModal .form-control");
  var select = document.getElementById('chucvu').selectedIndex;
  for (var i = 0; i < formTxt.length; i++) {
    // Fix chọn chức vụ không hiển thị "Chọn chức vụ"
    if(i == 7 && select != 0) {
      document.getElementById('chucvu').selectedIndex = 0;
    }
    formTxt[i].value = "";
  }
  getELE("tknv").disabled = false;
}
document.querySelector("#btnThem").onclick = clearContent;

// Thêm nhân viên mới
function themNhanVien() {
  var taiKhoan = getELE("tknv").value;
  var tenNV = getELE("name").value;
  var email = getELE("email").value;
  var password = getELE("password").value;
  var ngayLam = getELE("datepicker").value;
  var luongCB = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  // to check if input is valid
  var isValidInp = true;
  // Kiểm tra tài khoản hợp lệ (Ko rỗng, từ 4-6 ký tự số)
  isValidInp &=
    validate.checkEmpty(
      taiKhoan,
      "tbTKNV",
      "Tài khoản nhân viên không được trống"
    ) &&
    validate.checkAccount(
      taiKhoan,
      "tbTKNV",
      "Tài khoản từ 4 đến 6 ký tự số"
    ) &&
    validate.checkExistedUser(
      taiKhoan,
      "tbTKNV",
      "Tài khoản đã tồn tại",
      dsnv.mangNV
    );

  // Kiểm tra tên hợp lệ (rỗng và chỉ chữ)
  isValidInp &=
    validate.checkEmpty(tenNV, "tbTen", "Tên nhân viên không được trống") &&
    validate.checkName(tenNV, "tbTen", "Tên nhân viên chỉ được nhập chữ");

  // Kiểm tra email hợp lệ (rỗng và định dạng)
  isValidInp &=
    validate.checkEmpty(email, "tbEmail", "Email không được để trống") &&
    validate.checkEmail(email, "tbEmail", "Email không đúng định dạng");

  // Kiểm tra mật khẩu (rỗng + định dạng)
  isValidInp &=
    validate.checkEmpty(
      password,
      "tbMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    validate.checkPass(
      password,
      "tbMatKhau",
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // Kiểm tra ngày hợp lệ
  isValidInp &=
    validate.checkEmpty(ngayLam, "tbNgay", "Ngày không được để trống") &&
    validate.checkDate(ngayLam, "tbNgay", "Định dạng ngày MM/DD/YYYY");

  // Kiểm tra lương hợp lệ
  isValidInp &=
    validate.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống") &&
    validate.checkSalary(
      luongCB,
      "tbLuongCB",
      "Lương chỉ được khoảng 1tr - 20tr"
    );

  // Kiểm tra chức vụ
  isValidInp &= validate.checkTitle("chucvu", "tbChucVu", "Chưa chọn chức vụ");

  // Kiểm tra giờ làm hợp lệ
  isValidInp &=
    validate.checkEmpty(gioLam, "tbGiolam", "Giờ làm không đc để trống") &&
    validate.checkHour(
      gioLam,
      "tbGiolam",
      "Giờ làm chỉ trong khoảng 80-200 giờ"
    );

  if (isValidInp) {
    // tạo thể hiện của NV
    var nv = new NhanVien(
      taiKhoan,
      tenNV,
      email,
      password,
      ngayLam,
      Number(luongCB),
      chucVu,
      Number(gioLam)
    );

    // Tíng tổng lương nhân viên
    nv.tongLuong();

    // Xếp loại giờ làm nhân viên 
    nv.xepLoaiNV();

    // Thêm nv vào mangNV
    dsnv.themNV(nv);

    // Gọi hàm hiển thị
    hienThiDS(dsnv.mangNV);

    setLocalStorage();
    clearContent();
  }
}

// Hiển thị DSNV
function hienThiDS(mangNV) {
  var content = ""; // Giá trị ban đầu
  mangNV.map(function (nv) {
    var trELE = `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class="btn btn-primary p-lg-2" onclick="suaNhanVien('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal" id="btnSua">Sửa</button>
                    <button class="btn btn-danger p-lg-2" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
                </td>
            </tr>
        `;
    content += trELE;
  });
  getELE("tableDanhSach").innerHTML = content;
}
// Xem chi tiết
function suaNhanVien(tknv) {
  var index = dsnv.timViTri(tknv);
  if (index > -1) {
    // tim thay
    var nvTim = dsnv.mangNV[index];
    getELE("tknv").value = nvTim.taiKhoan;
    getELE("tknv").disabled = true;
    getELE("name").value = nvTim.tenNV;
    getELE("email").value = nvTim.email;
    getELE("password").value = nvTim.password;
    getELE("datepicker").value = nvTim.ngayLam;
    getELE("luongCB").value = nvTim.luongCB;
    getELE("chucvu").value = nvTim.chucVu;
    getELE("gioLam").value = nvTim.gioLam;
  }
}

function capNhatNhanVien() {
  var taiKhoan = getELE("tknv").value;
  var tenNV = getELE("name").value;
  var email = getELE("email").value;
  var password = getELE("password").value;
  var ngayLam = getELE("datepicker").value;
  var luongCB = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  // Xét dữ liệu phù hợp điều kiện
  var isValidInp = true;

  // Kiểm tra tên hợp lệ (rỗng và chỉ chữ)
  isValidInp &=
    validate.checkEmpty(tenNV, "tbTen", "Tên nhân viên không được trống") &&
    validate.checkName(tenNV, "tbTen", "Tên nhân viên chỉ được nhập chữ");

  // Kiểm tra email hợp lệ (rỗng và định dạng)
  isValidInp &=
    validate.checkEmpty(email, "tbEmail", "Email không được để trống") &&
    validate.checkEmail(email, "tbEmail", "Email không đúng định dạng");

  // Kiểm tra mật khẩu (rỗng + định dạng)
  isValidInp &=
    validate.checkEmpty(
      password,
      "tbMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    validate.checkPass(
      password,
      "tbMatKhau",
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // Kiểm tra ngày hợp lệ
  isValidInp &=
    validate.checkEmpty(ngayLam, "tbNgay", "Ngày không được để trống") &&
    validate.checkDate(ngayLam, "tbNgay", "Định dạng ngày MM/DD/YYYY");

  // Kiểm tra lương hợp lệ
  isValidInp &=
    validate.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống") &&
    validate.checkSalary(
      luongCB,
      "tbLuongCB",
      "Lương chỉ được khoảng 1tr - 20tr"
    );

  // Kiểm tra chức vụ
  isValidInp &= validate.checkTitle("chucvu", "tbChucVu", "Chưa chọn chức vụ");

  // Kiểm tra giờ làm hợp lệ
  isValidInp &=
    validate.checkEmpty(gioLam, "tbGiolam", "Giờ làm không đc để trống") &&
    validate.checkHour(
      gioLam,
      "tbGiolam",
      "Giờ làm chỉ trong khoảng 80-200 giờ"
    );
  if (isValidInp) {
    // tạo thể hiện của NV
    var nv = new NhanVien(
      taiKhoan,
      tenNV,
      email,
      password,
      ngayLam,
      Number(luongCB),
      chucVu,
      Number(gioLam)
    );

    // Tính tổng lương
    nv.tongLuong();
    // Xếp loại nv dựa trên số giờ làm
    nv.xepLoaiNV();

    dsnv.capNhatNV(nv);
    hienThiDS(dsnv.mangNV);
    setLocalStorage();
    clearContent();
    document.querySelector('#modal-footer #btnDong').click();
  }
}

// Xoá nhân viên
function xoaNhanVien(tknv) {
  dsnv.xoaNV(tknv);
  hienThiDS(dsnv.mangNV);
  setLocalStorage(dsnv.mangNV);
}


// Tìm kiếm theo xếp loại NV
function timKiemTheoXL() {
  var tuKhoa = getELE("searchName").value;
  var mangTK = dsnv.timKiem(tuKhoa.trim());
  hienThiDS(mangTK);
}
getELE("btnTimNV").onclick = timKiemTheoXL;

getELE("searchName").onkeyup = timKiemTheoXL;

// Tắt thông báo lỗi

// Khi click nút thêm, các thông báo lỗi biến mất
var myBtnThem = document.getElementById("btnThem");
myBtnThem.addEventListener("click", tatTB);

// Khi click nút "Sửa", các thông báo lỗi biến mất
var myBtnSua = document.getElementById("btnSua");
myBtnSua.addEventListener("click", tatTB);


function tatTB() {
  var tb = document.querySelectorAll(".sp-thongbao");
  for (var i = 0; i < tb.length; i++) {
    if (tb[i].style.display === "block"){
      tb[i].style.display = "none";
    }
  }
}
