const { challenges } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

exports.getRandomChallenge = (request, h) => {

  try {

    const randomIndex = getRandomInt(0, challenges.length - 1);

    const challenge = challenges[randomIndex];

    challenge.answers = challenge.answers.map(({ id, value }) => ({ id, value }))

    return challenge;

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.createNewChallenge = (request, h) => {

  try {

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

  } catch (error) {

    console.error(error);

    throw error;

  }

};