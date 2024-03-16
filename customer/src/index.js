const api = new Api();
let cart = [];
getLocalStorage();

function getListProduct() {
  const promise = api.fetchData();
  promise
    .then(function (result) {
      renderUI(result.data);
      product = result.data;
    })
    .catch();
}
getListProduct();

function renderUI(data) {
  let content = "";

  data.forEach(function (product) {
    content += `
        <div class="col-12 col-md-6 col-6">
        <div class="card cardPhone">
            <div class="cardPhone_img">
                <img src="./customer/asset/img/${product.img}"
                    class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body">
                <div class="">
                    <div>                             
                        <div>
                            <h3 class="cardPhone__title">${product.name}</h3>
                            <h3 class="cardPhone__title_1">${product.price}</h3>
                        </div>
                        <div class="cardPhone__text">
                            <p>Màn hình: ${product.screen}</p>
                            <p>Camera sau: ${product.backCamera}</p>
                            <p>Camera trước: ${product.frontCamera}</p>
                            <p>${product.desc}</p>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="cardPhone__rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div>
                        <button class="btnPhone-shadow addToCartBtn"  data-product-id="${product.id}" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-shopping-cart"></i> Buy Now</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
        `;
  });
  document.getElementById("products__content_main").innerHTML = content;
}

// CHON THEO SAN PHAM
function filterProduct(product) {
  let type = document.getElementById("productFilter").value;
  let newBrand = [];
  if (type === "all") {
    newBrand = product;
  } else {
    newBrand = product.filter(function (product) {
      return product.type === type;
    });
  }
  renderUI(newBrand);
}

function setLocalStorage() {
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

function getLocalStorage() {
  if (!localStorage.getItem("cart")) return;
  const cartString = localStorage.getItem("cart");
  cart = JSON.parse(cartString);
  renderCart();
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnPhone-shadow")) {
    const clickedProductID = event.target.dataset.productId;
    // Kiểm tra xem clickedProductID có tồn tại không trước khi tìm kiếm sản phẩm
    if (clickedProductID) {
      const clickedProduct = product.find(
        (item) => item.id === clickedProductID
      );
      if (clickedProduct) {
        let existingCartItem = cart.find(
          (item) => item.product && item.product.id === clickedProduct.id
        );
        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          let newCartItem = { product: clickedProduct, quantity: 1 };
          cart.push(newCartItem);
        }
        renderCart();
        setLocalStorage();
      }
    }
  }
});

function capNhatSoLuong(productID, click) {
  if (cart && cart.length > 0) {
    const item = cart.find(
      (item) => item.product && item.product.id === productID
    );
    if (item) {
      if (click === "increase") {
        item.quantity++;
      } else if (click === "decrease" && item.quantity > 1) {
        item.quantity--;
      }
      renderCart();
      setLocalStorage();
    }
  }
}

function xoaSanPham(productID) {
  if (cart && cart.length > 0) {
    cart = cart.filter((item) => item.product && item.product.id !== productID);
    renderCart();
    setLocalStorage();
  }
}


function renderCart() {
  let totalAmount = 0;
  let cartContent = "";
  cart.forEach((item) => {
    // Kiểm tra xem item.product có tồn tại không trước khi truy cập thuộc tính price
    if (item.product && item.product.price !== undefined) {
      const subtotal = item.product.price * item.quantity;
      totalAmount += subtotal;
      cartContent += `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>${subtotal.toLocaleString()}</td>
        <td>         
          <button class="btn btn-info" onclick="capNhatSoLuong('${
            item.product.id
          }', 'decrease')">-</button>
          <button class="btn btn-info" onclick="capNhatSoLuong('${
            item.product.id
          }', 'increase')">+</button>
          <button class="btn btn-danger" onclick="xoaSanPham('${
            item.product.id
          }')">Xóa</button>
        </td>
      </tr>
      `;
    }
  });
  document.getElementById(
    "totalAmount"
  ).innerText = `Tổng tiền: $${totalAmount.toLocaleString()}`;
  document.getElementById("cartTableBody").innerHTML = cartContent;
}

document
  .getElementById("checkoutButton")
  .addEventListener("click", function () {
    cart = [];
    renderCart();
    setLocalStorage();
  });
