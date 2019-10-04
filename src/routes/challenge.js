const Joi = require('@hapi/joi');

const { validateAuthorization } = require('../middlewares');

const { challengeHandler } = require('../handlers');

module.exports = [
  {
    path: '/challenges/{id}/check',
    method: 'PUT',
    handler: challengeHandler.checkAnswer,
    options: {
      description: 'verifica se a resposta enviada é a correta',
      validate: {
        headers: {
          hash: Joi.string().max(60).required().example('sj21j-sdknas-223md-n2jn32')
        },
        options: {
          allowUnknown: true
        },
        params: Joi.object({
          id: Joi.number().integer().positive().example(22).required()
        }).label('PARAM-POST-challenges-check'),
        payload: Joi.object({
          answerId: Joi.number().integer().positive().required().example(2)
        }).label('POST-challenges-check')
      },
      response: {
        schema: Joi.object({
          right: Joi.boolean().example(true)
        }).label('RES-POST-challenges-check')
      }
    }
  },
  {
    path: '/challenges/random',
    method: 'GET',
    handler: challengeHandler.getRandomChallenge,
    options: {
      description: 'retorna randomicamente um desafio e suas respostas',
      response: {
        schema: Joi.object({
          id: Joi.number().integer().positive().example(20),
          value: Joi.string().example('Isso é uma pergunta?'),
          answers: Joi.array().items(Joi.object({
            id: Joi.number().integer().positive().example(1),
            value: Joi.string().example('Sim'),
          }).label('ANSWER-RES-GET-challenges-random')).length(2).label('ANSWERS-RES-GET-challenges-random')
        }).label('RES-GET-challenges-random')
      }
    },
  },
  {
    path: '/challenges',
    method: 'POST',
    handler: challengeHandler.createNewChallenge,
    options: {
      description: 'adiciona um novo desafio',
      validate: {
        headers: {
          authorization: Joi.string().max(60).required().example('sj21j-sdknas-223md-n2jn32')
        },
        options: {
          allowUnknown: true
        },
        payload: Joi.object({
          value: Joi.string().required().example('Isso é uma pergunta?'),
          answers: Joi.array().items(Joi.object({
            right: Joi.boolean().required().example(true),
            value: Joi.string().required().example('Sim'),
          }).label('ANSWER-POST-challenges')).length(2).label('ANSWERS-POST-challenges')
        }).label('POST-challenges')
      },
      response: {
        schema: Joi.object({
          id: Joi.number().integer().positive().example(20),
          value: Joi.string().example('Isso é uma pergunta?'),
          answers: Joi.array().items(Joi.object({
            id: Joi.number().integer().positive().example(1),
            value: Joi.string().example('Sim'),
            right: Joi.boolean().example(false)
          }).label('ANSWER-RES-POST-challenges')).length(2).label('ANSWERS-RES-POST-challenges')
        }).label('RES-POST-challenges')
      },
      pre: [validateAuthorization]
    }
  }
];