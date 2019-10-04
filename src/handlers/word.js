const { categoryModel, wordModel } = require('../models');

exports.createNewWord = async (request, h) => {

  try {

    const payload = request.payload;

    const category = await categoryModel.findOne(payload.categoryId);

    if (!category)
      throw new Error(`Category ${payload.categoryId} not found`);

    const newWord = {
      id: await wordModel.create(payload.name, category.id),
      name: payload.name,
      categoryId: payload.categoryId
    };

    return newWord;

  } catch (error) {

    console.error(error);

    throw error;
  }

}

exports.checkIfHasLetter = async (request, h) => {

  try {

    const wordId = request.params.id;
    const payload = request.payload;

    const word = await wordModel.findOne(wordId);

    if (!word)
      throw new Error("Id inválido");

    const letters = word.name.split('');

    const hasLetter = [];

    letters.forEach((letter, idx) => {

      if (letter.toLowerCase() === payload.letter.toLowerCase())
        return hasLetter.push(idx);

    });

    return hasLetter;

  } catch (error) {

    console.error(error);

    throw error;

  }

}