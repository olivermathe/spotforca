const Joi = require('@hapi/joi');

const { validateAuthorization } = require('../middlewares');

const { categoryHandler } = require('../handlers');

module.exports = [
  {
    path: '/categories',
    method: 'GET',
    handler: categoryHandler.getAllCategories,
    options: {
      description: 'retorna todas categorias',
      response: {
        schema: Joi.array().items(Joi.object({
          id: Joi.number().integer().positive().example(23),
          name: Joi.string().example('terror'),
        }).label('ITEM-RES-GET-categories')).label('RES-GET-categories'),
      }
    }
  },
  {
    path: '/categories/{id}/words/random',
    method: 'GET',
    handler: categoryHandler.getRandomCategoryWord,
    options: {
      description: 'retorna randomicamente uma plavra de uma categoria',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().positive().example(22).required()
        }).label('PARAM-GET-categories-words-random'),
      },
      response: {
        schema: Joi.object({
          id: Joi.number().integer().positive().example(23),
          length: Joi.number().integer().positive().example(5),
        }).label('RES-GET-categories-words-random'),
      },
    },
  },
  {
    path: '/categories',
    method: 'POST',
    handler: categoryHandler.createNewCategory,
    options: {
      description: 'adiciona uma nova categoria',
      validate: {
        headers: {
          authorization: Joi.string().max(60).required().example('sj21j-sdknas-223md-n2jn32')
        },
        options: {
          allowUnknown: true
        },
        payload: Joi.object({
          name: Joi.string().required().example('terror'),
        }).label('RES-POST-categories'),
      },
      pre: [validateAuthorization]
    }
  }
];