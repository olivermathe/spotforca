const { categoryHandler } = require('../handlers');

module.exports = [
  {
    path: '/category',
    method: 'GET',
    handler: categoryHandler.getAllCategories,
    options: {
      description: 'retorna todas categorias',
    }
  },
  {
    path: '/category/{id}/word/random',
    method: 'GET',
    handler: categoryHandler.getRandomCategoryWord,
    options: {
      description: 'retorna randomicamente uma plavra de uma categoria',
    },
  },
  {
    path: '/category',
    method: 'PUT',
    handler: categoryHandler.createNewCategory,
    options: {
      description: 'adiciona uma nova categoria',
    }
  }
];