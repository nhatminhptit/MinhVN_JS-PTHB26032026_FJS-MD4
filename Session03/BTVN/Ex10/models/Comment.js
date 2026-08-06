let comments = [];

const create = (data) => {
  const newComment = { id: Date.now(), ...data };
  comments.push(newComment);
  return newComment;
};

const findByPostId = (postId) => {
  return comments.filter((c) => c.postId === parseInt(postId));
};

const deleteByPostId = (postId) => {
  comments = comments.filter((c) => c.postId !== parseInt(postId));
};

module.exports = {
  create,
  findByPostId,
  deleteByPostId,
};
