const { challenges } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

module.exports = [
  {
    path: '/challenge/random',
    method: 'GET',
    handler(request, h) {

      const randomIndex = getRandomInt(0 , challenges.length -1);

      const challenge = challenges[randomIndex];

      return challenge;

    },
    options: {
      description: 'retorna randomicamente um desafio e suas respostas',
    },
  },
  {
    path: '/challenge',
    method: 'PUT',
    handler(request, h) {

      const payload = request.payload;

      const newChallenge = {
        id: getRandomInt(1, 100),
        value: payload.value,
        answers: [
          {
            id: getRandomInt(1, 100),
            value: payload.answers[0].value,
            right: payload.answers[0].right || false,
          },
          {
            id: getRandomInt(1, 100),
            value: payload.answers[1].value,
            right: payload.answers[1].right || false,
          },
          {
            id: getRandomInt(1, 100),
            value: payload.answers[2].value,
            right: payload.answers[2].right || false,
          }
        ]
      };

      challenges.push(newChallenge);

      return newChallenge;

    },
    options: {
      description: 'adiciona um novo desafio',
    }
  }
];