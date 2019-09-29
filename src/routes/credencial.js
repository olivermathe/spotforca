const Joi = require('@hapi/joi');

const { credencialHandler } = require('../handlers');

module.exports = [
  {
    path: '/credencials',
    method: 'POST',
    handler: credencialHandler.login,
    options: {
      description: 'realiza autenticação do administrador',
      validate: {
        payload: Joi.object({
          user: Joi.string().max(20).required(),
          pass: Joi.string().max(10).required()
        }).label('POST-credencials')
      },
    }
  }
]