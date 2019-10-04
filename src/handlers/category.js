const { categoryModel, wordModel } = require('../models')
const { getRandomInt } = require('../shared/utils');

exports.createNewCategory = async (request, h) => {

  try {

    const name = request.payload.name;

    const id = await categoryModel.create(name);

    return { id, name };

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.getRandomCategoryWord = async (request, h) => {

  try {

    const wordsCategory = await wordModel.findByCategory(request.params.id)

    if (wordsCategory.length === 0)
      return {};

    const randomIndex = getRandomInt(0, wordsCategory.length - 1);

    const word = wordsCategory[randomIndex];

    return {
      length: word.name.length,
      id: word.id
    };

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.getAllCategories = async (request, h) => {

  try {

    const cats = await categoryModel.findAll();

    return cats;
    
  } catch (error) {

    console.error(error);

    throw error;
    
  }

};