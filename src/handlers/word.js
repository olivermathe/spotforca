const { words, categories } = require('../mocks');
const { getRandomInt } = require('../shared/utils')

exports.createNewWord = (request, h) => {

  try {

    const payload = request.payload;

    const categoryIdx = categories.findIndex(category => category.id == payload.categoryId);

    if (categoryIdx === -1)
      throw new Error(`Category ${payload.categoryId} not found`);

    const newWord = {
      id: getRandomInt(1, 100),
      name: payload.name,
      categoryId: payload.categoryId
    };

    words.push(newWord);

    return newWord;

  } catch (error) {

    console.error(error);

    throw error;
  }

}

exports.checkIfHasLetter = (request, h) => {

  const wordId = request.params.id;
  const payload = request.payload;

  const word = words.find(({ id }) => id == wordId);

  if(!word)
    throw new Error("Id inválido");

  const letters = word.name.split('');

  const hasLetter = [];
  
  letters.forEach((letter, idx) => {

    if(letter.toLowerCase() === payload.letter.toLowerCase())
      return hasLetter.push(idx);

  });

  return hasLetter;

}