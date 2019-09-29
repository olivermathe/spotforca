const Joi = require('@hapi/joi');

const { wordHandler } = require('../handlers');

module.exports = [
  {
    path: '/words',
    method: 'POST',
    handler: wordHandler.createNewWord,
    options: {
      description: 'adiciona uma nova palavra',
      validate: {
        headers: {
          authorization: Joi.string().max(60).required().example('sj21j-sdknas-223md-n2jn32')
        },
        options: {
          allowUnknown: true
        },
        payload: Joi.object({
          name: Joi.string().example('teste').required(),
          catagoryId: Joi.number().integer().positive().example(12).required()
        }).label('POST-word'),
      },
      response: {
        schema: Joi.object({
          id: Joi.number().integer().positive().example(23),
          name: Joi.string().example('teste'),
          catagoryId: Joi.number().positive().example(12)
        }).label('RES-POST-word'),
      },
      pre: [validateAuthorization]
    }
  },
  {
    path: '/words/{id}/check',
    method: 'PUT',
    handler: wordHandler.checkIfHasLetter,
    options: {
      description: 'verifica se palavra possui letra',
      validate: {
        headers: {
          hash: Joi.string().max(60).required().example('sj21j-sdknas-223md-n2jn32')
        },
        options: {
          allowUnknown: true
        },
        params: Joi.object({
          id: Joi.number().integer().positive().example(22).required()
        }).label('PARAM-POST-word-check'),
        payload: Joi.object({
          letter: Joi.string().regex(/[a-zA-Z]/).length(1).example('a').required()
        }).label('POST-word-check'),
      },
      response: {
        schema: Joi.array().items(Joi.number().integer().positive().allow(0)).label('RES-POST-word-check')
      }
    }
  }
];