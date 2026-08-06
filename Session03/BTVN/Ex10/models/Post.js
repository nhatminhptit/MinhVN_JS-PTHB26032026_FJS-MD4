let posts = [];

const getAll = () => {
  return posts;
};

const create = (data) => {
  const newPost = { id: Date.now(), ...data };
  posts.push(newPost);
  return newPost;
};

const findById = (id) => {
  return posts.find((p) => p.id === parseInt(id));
};

const deleteById = (id) => {
  const initialLength = posts.length;
  posts = posts.filter((p) => p.id !== parseInt(id));
  return posts.length !== initialLength;
};

module.exports = {
  getAll,
  create,
  findById,
  deleteById,
};
