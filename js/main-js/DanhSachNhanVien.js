/**
 * + Lưu trữ nhiều đối tượng NV
 * + Thêm NV (thêm phần tử mới cho mảng)
 * + Xóa, sửa
 */
function DanhSachNhanVien() {
  // thuộc tính
  this.mangNV = [];

  //phương thức
  // truyền tham số là đối tượng NV
  this.themNV = function (nv) {
    this.mangNV.push(nv);
  };
  this.timViTri = function (tknv) {
    // giả sử viTri chưa tìm thấy nên = -1
    var viTri = -1;
    // Duyệt mảng và so sánh mã để tìm nhân viên trong mảng
    this.mangNV.map(function (nv, index) {
      if (nv.taiKhoan === tknv) {
        // tìm thấy
        viTri = index;
      }
    });

    // trả kết quả vị trí tìm thấy ra khỏi hàm để sử dụng ở các hàm khác
    return viTri;
  };


  this.capNhatNV = function (nv) {
    var viTri = this.timViTri(nv.taiKhoan);
    if (viTri > -1) {
      // tìm thấy
      dsnv.mangNV[viTri] = nv;
    }
  };

  // Xoá nhân viên
  this.xoaNV = function (tknv) {
    var viTri = this.timViTri(tknv);
    if (viTri > -1) {
      this.mangNV.splice(viTri, 1);
    }
  };
}

DanhSachNhanVien.prototype.timKiem = function(tuKhoa) {
  var mangTK = [];
  var tuKhoaThuong = tuKhoa.toLowerCase();
  this.mangNV.map(function(nv){
      var tenNVThuong = nv.xepLoai.toLowerCase();
      var viTriTK = tenNVThuong.indexOf(tuKhoaThuong);
      if(viTriTK > -1) {
          // tìm thấy
          mangTK.push(nv);
      }
  });
  return mangTK;
}
