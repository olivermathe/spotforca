const Uuid = require('uuid/v4');
const { credencialModel } = require('../models');

exports.login = async (request, h) => {

  try {

    const payload = request.payload;

    if (payload.user !== 'admin' || payload.pass !== '@dmin321')
      return h.response().code(401);

    const actualCredencial = await credencialModel.findCurrent();

    if (actualCredencial)
      await credencialModel.setToInvalid(actualCredencial.id);

    const authorization = Uuid();

    const newCredencial = {
      id: await credencialModel.create(authorization),
      userId: 1,
      authorization,
      isValid: true
    }

    return h.response().header('Authorization', newCredencial.authorization).code(204);

  } catch (error) {

    console.error(error);

    throw error;

  }

}