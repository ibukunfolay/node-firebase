class Product {
  constructor(id, name, price, retailer, amountInStock) {
    (this.id = id),
      (this.name = name),
      (this.price = price),
      (this.retailer = retailer),
      (this.amountInStock = amountInStock);
  }
}

module.exports = Product;
