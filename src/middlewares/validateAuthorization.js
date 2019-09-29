const { credencials } = require('../mocks');

module.exports = (request, h) => {

  try {

    const authorization = request.headers.authorization

    const validCredencial = credencials.findIndex(credencial => credencial.isValid && credencial.authorization === authorization);

    if (validCredencial === -1)
      return h.response().code(402);

    return true;

  } catch (error) {

    console.error(error);

    throw error;

  }

}