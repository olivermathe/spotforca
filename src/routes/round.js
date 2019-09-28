const Joi = require('@hapi/joi');

const { roundHandler } = require('../handlers')

module.exports = [
  {
    path: '/rounds',
    method: 'POST',
    handler: roundHandler.startNewRound,
    options: {
      description: 'inicia uma nova rodada',
      validate: {
        payload: Joi.object({
          nickname: Joi.string().regex(/[a-zA-Z0-9]/).max(20).required().example('ful4n0')
        }).label('POST-round')
      },
      response: {
        schema: Joi.object({
          hash: Joi.string().max(60).example('sj21j-sdknas-223md-n2jn32')
        }).label('RES-POST-round')
      }
    }
  },
  {
    path: '/rounds',
    method: 'GET',
    handler: roundHandler.getRoundsRank,
    options: {
      description: 'retorna as 5 melhores rodadas',
      response: {
        schema: Joi.array().items(Joi.object({
          nickname: Joi.string().regex(/[a-zA-Z0-9]/).max(20).example('ful4n0'),
          score: Joi.number().integer().positive().example(4000),
        }).label('ITEM-RES-GET-rounds')).max(5).label('RES-GET-rounds')
      }
    }
  }
]