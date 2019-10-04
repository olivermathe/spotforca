const { challengeModel, answerModel } = require('../models');
let { challenges } = require('../mocks');
const { getRandomInt } = require('../shared/utils');

exports.getRandomChallenge = async (request, h) => {

  try {

    challenges = await challengeModel.findAll();

    const randomIndex = getRandomInt(0, challenges.length - 1);

    let challenge = challenges[randomIndex];

    challenge.answers = await answerModel.findByChallenge(challenge.id);

    return challenge;

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.createNewChallenge = async (request, h) => {

  try {

    const payload = request.payload;

    const challengeId = await challengeModel.create(payload.value);

    const newChallenge = {
      id: challengeId,
      value: payload.value,
      answers: []
    }
      
    for (const answer of payload.answers) {
      
      answer.id = await answerModel.create(answer.value, answer.right || false, challengeId);

      newChallenge.answers.push(answer);

    }

    return newChallenge;

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.checkAnswer = async (request, h) => {

  try {

    const answer = await answerModel.findOne(request.payload.answerId)

    const response = { right: !!answer.right };

    return response;

  } catch (error) {

    console.error(error);

    throw error;
    
  }

}