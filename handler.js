const sinesp = require("sinesp-nodejs");

module.exports.consultaPlaca = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let placa = event.pathParameters.placa.replace(/\W/g, "");

  sinesp
    .consultaPlaca(placa)
    .then(response => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(response)
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(err)
      });
    });
};
