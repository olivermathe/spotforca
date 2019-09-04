const Joi = require('@hapi/joi');

const { wordHandler } = require('../handlers');

module.exports = [
  {
    path: '/word',
    method: 'PUT',
    handler: wordHandler.createNewWord,
    options: {
      description: 'adiciona uma nova palavra',
      validate: {
        payload: Joi.object({
          name: Joi.string().example('teste').required(),
          catagoryId: Joi.number().positive().example(12).required()
        }).label('PUT-word'),
      },
      response: {
        schema: Joi.object({
          id: Joi.number().positive().example(23),
          name: Joi.string().example('teste'),
          catagoryId: Joi.number().positive().example(12)
        }).label('RES-PUT-word'),
      }
    }
  },
  {
    path: '/word/{id}/check',
    method: 'POST',
    handler: wordHandler.checkIfHasLetter,
    options: {
      description: 'verifica se palavra possui letra',
      validate: {
        params: Joi.object({
          id: Joi.number().positive().example(22).required()
        }),
        payload: Joi.object({
          letter: Joi.string().length(1).example('a').required()
        }).label('POST-word-id-check'),
      },
    }
  }
];