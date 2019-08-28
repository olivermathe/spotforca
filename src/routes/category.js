const { categories, words } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

function findCategory(id) {
  return categories.find(category => category.id == id);
}

module.exports = [
  {
    path: '/category',
    method: 'GET',
    handler(request, h) {

      return categories;

    },
    options: {
      description: 'retorna todas categorias',
    }
  },
  {
    path: '/category/{id}/word/random',
    method: 'GET',
    handler(request, h) {

      const wordsCategory = words.filter(word => word.categoryId == request.params.id);

      const randomIndex = getRandomInt(0 , wordsCategory.length -1);

      const word = wordsCategory[randomIndex];

      return word;

    },
    options: {
      description: 'retorna randomicamente uma plavra de uma categoria',
    },
  },
  {
    path: '/category',
    method: 'PUT',
    handler(request, h) {

      const payload = request.payload;

      const newCategory = {
        id: getRandomInt(1, 100),
        name: payload.name,
      };

      categories.push(newCategory);

      return newCategory;

    },
    options: {
      description: 'adiciona uma nova categoria',
    }
  }
];