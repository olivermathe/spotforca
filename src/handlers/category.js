const { categories, words } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

exports.createNewCategory = (request, h) => {

  const payload = request.payload;

  const newCategory = {
    id: getRandomInt(1, 100),
    name: payload.name,
  };

  categories.push(newCategory);

  return newCategory;

};

exports.getRandomCategoryWord = (request, h) => {

  const wordsCategory = words.filter(word => word.categoryId == request.params.id);

  const randomIndex = getRandomInt(0 , wordsCategory.length -1);

  const word = wordsCategory[randomIndex];

  return word;

};

exports.getAllCategories = (request, h) => {

  return categories;

};