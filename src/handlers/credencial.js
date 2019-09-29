const Uuid = require('uuid/v4');
const { getRandomInt } = require('../shared/utils')
const { credencials } = require('../mocks')

exports.login = (request, h) => {

  try {

    const payload = request.payload;

    if (payload.user !== 'admin' || payload.pass !== '@dmin321')
      return h.response().code(401);

    const actualCredencialIdx = credencials.findIndex(credential => credential.isValid && credential.userId === 1);

    if (actualCredencialIdx !== -1)
      credencials[actualCredencialIdx].isValid = false;

    const newCredencial = {
      id: getRandomInt(1, 100),
      userId: 1,
      authorization: Uuid(),
      isValid: true
    }

    credencials.push(newCredencial)

    return h.response().header('Authorization', newCredencial.authorization).code(204);

  } catch (error) {

    console.error(error);

    throw error;

  }

}