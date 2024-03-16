// Khởi tạo đối tượng API
const api = new Api();
const validation = new Validation();

// Hàm lấy phần tử theo id
function getEle(id) {
  return document.getElementById(id);
}

// Hàm lấy danh sách sản phẩm và hiển thị lên giao diện
function getListProduct() {
  const promise = api.fetchData();
  promise
    .then(function (result) {
      renderUI(result.data);
      product = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Gọi hàm lấy danh sách sản phẩm khi trang được tải
getListProduct();

// Hàm hiển thị danh sách sản phẩm lên giao diện
function renderUI(data) {
  let content = "";

  data.forEach(function (product, index) {
    content += `
          <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>
                <img src="./asset/img/${product.img}" width="50" alt="image" />
              </td>
              <td>${product.type}</td>  
              <td>${product.price}</td>
              <td>${product.screen}</td>
              <td>${product.frontCamera}</td>
              <td>${product.backCamera}</td>
              <td>${product.desc}</td>
              <td class="">
                <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="editProduct(${
                  product.id
                })">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
              </td>
          </tr>
      `;
  });

  getEle("tbodySP").innerHTML = content;
}

// Hàm xóa sản phẩm
function deleteProduct(id) {
  const promise = api.delete(id);
  promise
    .then(function () {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm chỉnh sửa thông tin sản phẩm
function editProduct(id) {
  getEle("exampleModalLabel").innerHTML = "Sửa thông tin sản phẩm";
  getEle("btnThemSP").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      getEle("productID").value = product.id;
      getEle("tenSP").value = product.name;
      getEle("giaSP").value = product.price;
      getEle("manHinh").value = product.screen;
      getEle("camSau").value = product.backCamera;
      getEle("camTruoc").value = product.frontCamera;
      getEle("hinhSP").value = product.img;
      getEle("moTa").value = product.desc;
      getEle("loai").value = product.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm cập nhật thông tin sản phẩm
function updateProduct() {
  const id = getEle("productID").value;
  const name = getEle("tenSP").value;
  const price = getEle("giaSP").value;
  const screen = getEle("manHinh").value;
  const backCam = getEle("camSau").value;
  const frontCam = getEle("camTruoc").value;
  const img = getEle("hinhSP").value;
  const desc = getEle("moTa").value;
  const type = getEle("loai").value;

  let isValid = true;
  isValid =
    validation.kiemTraRong(name, "invalidTen", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(price, "invalidGia", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(screen, "invalidManHinh", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(backCam, "invalidCamSau", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(frontCam, "invalidCamTruoc", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(img, "invalidHinh", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(desc, "invalidMoTa", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(type, "invalidLoai", "(*)Không để trống") && isValid;

  // Nếu có lỗi validation, dừng hàm
  if (!isValid) return;
  // Tiếp tục thực hiện cập nhật sản phẩm
  const product = new Product(
    id,
    name,
    price,
    screen,
    backCam,
    frontCam,
    img,
    desc,
    type
  );
  const promise = api.update(product);
  promise
    .then(function () {
      getListProduct();
      // Đóng modal sau khi cập nhật thành công
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm thêm sản phẩm mới
function addProduct() {
  const name = getEle("tenSP").value;
  const price = getEle("giaSP").value;
  const screen = getEle("manHinh").value;
  const backCam = getEle("camSau").value;
  const frontCam = getEle("camTruoc").value;
  const img = getEle("hinhSP").value;
  const desc = getEle("moTa").value;
  const type = getEle("loai").value;

  let isValid = true;
  isValid =
    validation.kiemTraRong(name, "invalidTen", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(price, "invalidGia", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(screen, "invalidManHinh", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(backCam, "invalidCamSau", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(frontCam, "invalidCamTruoc", "(*)Không để trống") &&
    isValid;
  isValid =
    validation.kiemTraRong(img, "invalidHinh", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(desc, "invalidMoTa", "(*)Không để trống") && isValid;
  isValid =
    validation.kiemTraRong(type, "invalidLoai", "(*)Không để trống") && isValid;

  // Nếu có lỗi validation, dừng hàm
  if (!isValid) return;
  // Tiếp tục thực hiện thêm sản phẩm mới
  const product = new Product(
    "",
    name,
    price,
    screen,
    backCam,
    frontCam,
    img,
    desc,
    type
  );
  const promise = api.add(product);
  promise
    .then(function () {
      // Đóng modal sau khi thêm sản phẩm thành công
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Sắp xếp sản phẩm theo giá tiền
function SapXep(selectBox) {
  let sapXep = selectBox.value;
  let newProduct = [...product];

  if (sapXep === "tang") {
    newProduct.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sapXep === "giam") {
    newProduct.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  renderUI(newProduct);
}

// Tìm kiếm sản phẩm theo tên
getEle("searchName").addEventListener("keyup", function () {
  const keyword = getEle("searchName").value.toLowerCase();
  const filteredProducts = product.filter(function (product) {
    return product.name.toLowerCase().includes(keyword);
  });
  renderUI(filteredProducts);
});
