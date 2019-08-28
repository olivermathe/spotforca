const { challengeHandler } = require('../handlers');

module.exports = [
  {
    path: '/challenge/random',
    method: 'GET',
    handler: challengeHandler.getRandomChallenge,
    options: {
      description: 'retorna randomicamente um desafio e suas respostas',
    },
  },
  {
    path: '/challenge',
    method: 'PUT',
    handler: challengeHandler.createNewChallenge,
    options: {
      description: 'adiciona um novo desafio',
    }
  }
];