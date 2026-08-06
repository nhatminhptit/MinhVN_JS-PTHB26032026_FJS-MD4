let products = [
  { id: 1, name: "Lenovo Legion", price: 25000000, quantity: 5 },
  { id: 2, name: "Chuột Logitech G903", price: 2000000, quantity: 15 },
];

const getAll = () => {
  return products;
};

const create = (data) => {
  const nextId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: nextId,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  };
  products.push(newProduct);
  return newProduct;
};

const findById = (id) => {
  return products.find((p) => p.id === parseInt(id));
};

module.exports = {
  getAll,
  create,
  findById,
};
