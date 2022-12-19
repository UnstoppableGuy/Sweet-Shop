class Product {
    constructor(id, name, description, price, image, categoryId, tags) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = image;
      this.category = categoryId;
      this.tags = tags;
    }
}

export default Product;