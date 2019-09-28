const Uuid = require('uuid/v4');

const { rounds } = require('../mocks')
const { getRandomInt } = require('../shared/utils');

exports.startNewRound = (request, h) => {

  try {

    const payload = request.payload;

    const newRound = {
      id: getRandomInt(1, 100),
      nickname: payload.nickname,
      hash: Uuid(),
      score: 0,
      status: 1
    };

    rounds.push(newRound);

    return { hash: newRound.hash };

  } catch (error) {

    console.error(error);

    throw error;

  }

};

exports.getRoundsRank = (request, h) => {

  try {

    const finishedStatus = 2;

    const finishedRounds = rounds.filter(round => round.status === finishedStatus)

    const sortedRounds = finishedRounds.sort((roundOne, roundTwo) => roundTwo.score - roundOne.score);

    const fiveFirstRounds = sortedRounds.slice(0, 4);

    return fiveFirstRounds.map(round => ({
      nickname: round.nickname,
      score: round.score
    }));

  } catch (error) {

    console.error(error);

    throw error;

  }

}