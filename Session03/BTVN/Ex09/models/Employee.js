let employees = [
  { id: 1, name: "Vu Nhat Minh", email: "minh@example.com", avatarUrl: null },
];

const getAll = () => {
  return employees;
};

const findByEmail = (email) => {
  return employees.find((emp) => emp.email === email);
};

const create = (data) => {
  const nextId =
    employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
  const newEmp = {
    id: nextId,
    name: data.name,
    email: data.email,
    avatarUrl: null,
  };
  employees.push(newEmp);
  return newEmp;
};

const findById = (id) => {
  return employees.find((emp) => emp.id === parseInt(id));
};

const updateAvatar = (id, filename) => {
  const emp = findById(id);
  if (emp) {
    emp.avatarUrl = `/uploads/${filename}`;
    return emp;
  }
  return null;
};

module.exports = {
  getAll,
  findByEmail,
  create,
  findById,
  updateAvatar,
};
