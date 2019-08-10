const Joi = require('joi');

const getAllValidate = Joi.object().keys({
  skip: Joi.number().default(0).positive(),
});

const dcardValidate = Joi.object().keys({
  query: Joi.string(),
  sex: Joi.string().valid(['m', 'f', 'M', 'F']),
  skip: Joi.number().default(0).positive(),
  sort: Joi.string().default('new').valid(['new', 'old']),
}).or('query', 'sex');

const meteorValidate = Joi.object().keys({
  query: Joi.string(),
  sex: Joi.string().valid(['m', 'f', 'M', 'F']),
  skip: Joi.number().default(0).positive(),
  sort: Joi.string().default('new').valid(['new', 'old']),
}).or('query', 'sex');

const pttValidate = Joi.object().keys({
  query: Joi.string(),
  skip: Joi.number().default(0).positive(),
  sort: Joi.string().default('new').valid(['new', 'old']),
}).or('query');

module.exports.getAllValidate = getAllValidate;
module.exports.dcardValidate = dcardValidate;
module.exports.meteorValidate = meteorValidate;
module.exports.pttValidate = pttValidate;
