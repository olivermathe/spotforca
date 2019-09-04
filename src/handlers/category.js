const { categories, words } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

exports.createNewCategory = (request, h) => {

  try {

    const payload = request.payload;

    const newCategory = {
      id: getRandomInt(1, 100),
      name: payload.name,
    };

    categories.push(newCategory);

    return newCategory;

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.getRandomCategoryWord = (request, h) => {

  try {
    
    const wordsCategory = words.filter(word => word.categoryId == request.params.id);

    if (wordsCategory.length === 0)
      return {};

    const randomIndex = getRandomInt(0 , wordsCategory.length -1);

    const word = wordsCategory[randomIndex];

    return {
      length: word.length,
      id: word.id
    };

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.getAllCategories = (request, h) => {

  return categories;

};