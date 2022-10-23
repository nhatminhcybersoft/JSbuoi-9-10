/**
 * Khai báo lớp đối tượng Nhân Viên
 */
function NhanVien(taiKhoan, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam) {
    // thuộc tính
    this.taiKhoan = taiKhoan;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.luong = 0;
    this.xepLoai = '';

    
    // phương thức
    this.tongLuong = function() {
        if (chucVu == "Sếp") {
            // Sep
            this.luong = this.luongCB * 3;
        } else if (chucVu == "Trưởng phòng") {
            // Truong phong
            this.luong = this.luongCB * 2;
        } else if (chucVu == "Nhân viên") {
            // Nhan vien
            this.luong = this.luongCB;
        }
    }

    this.xepLoaiNV = function(){
        if (Number(this.gioLam) >= 192 ) {
            this.xepLoai = "Xuất sắc";
        } else if (176 <= Number(this.gioLam) && Number(this.gioLam) <= 192) {
            this.xepLoai = "Giỏi";
        } else if (160 <= Number(this.gioLam) && Number(this.gioLam) <= 176) {
            this.xepLoai = "Khá";
        } else {
            this.xepLoai = "TB";
        }
    } 
}