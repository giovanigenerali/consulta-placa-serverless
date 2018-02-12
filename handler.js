// https://docs.aws.amazon.com/pt_br/lambda/latest/dg/programming-model.html

const sinesp = require('sinesp-nodejs');

// https://docs.aws.amazon.com/pt_br/lambda/latest/dg/nodejs-prog-model-handler.html
module.exports.consultaPlaca = (event, context, callback) => {

  let placa = event.pathParameters.placa.replace(/\W/g,"");

  sinesp.consultaPlaca(placa, (result) => {
  
    // https://docs.aws.amazon.com/pt_br/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html#context-and-callback
    context.callbackWaitsForEmptyEventLoop = false;
  
    // https://docs.aws.amazon.com/pt_br/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
    callback(null, {
      statusCode: 200, 
      body: JSON.stringify(result)
    });

  });

};