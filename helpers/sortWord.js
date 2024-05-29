const sortByLastAdd = (data) => {
  return data.Words.sort((a, b) => b.createdAt - a.createdAt);
};

const sortByASCChar = (data) => {
  return data.Words.sort((a, b) => a.asing.localeCompare(b.asing));
};

module.exports = { sortByLastAdd, sortByASCChar };
