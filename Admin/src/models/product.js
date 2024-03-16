function Product(
  _id,
  _name,
  _price,
  _screen,
  _backCamera,
  _fronCamera,
  _img,
  _desc,
  _type
) {
  this.id = _id;
  this.name = _name;
  this.price = _price;
  this.screen = _screen;
  this.backCamera = _backCamera;
  this.frontCamera = _fronCamera;
  this.img = _img;
  this.desc = _desc;
  this.type = _type;
}

function CartItem(_product, _quantity) {
  this.product = _product;
  this.quantity = _quantity;
}
