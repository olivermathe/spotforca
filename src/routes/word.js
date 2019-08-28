const { wordHandler } = require('../handlers');

module.exports = [
  {
    path: '/word',
    method: 'PUT',
    handler: wordHandler.createNewWord,
    options: {
      description: 'adiciona uma nova palavra',
    }
  }
];