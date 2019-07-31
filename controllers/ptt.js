const Joi = require('joi');

const PttSchema = require('../models/Post').Ptt;

const handler = require('.././libs/handler');

const { getAllValidate, pttValidate } = require('../libs/queryValidate');

exports.pttGetAll = (req, res, next) => {
  // 跳過 skip 幾資料
  const { value, error } = Joi.validate(req.query, getAllValidate);

  if (error) {
    return next(new handler.QueryError(error.details[0].message));
  }

  PttSchema.find()
    .sort({
      time: -1,
    })
    .limit(30)
    .skip(Number(value.skip))
    .exec()
    .then((result) => {
      res.status(200).json(
        result,
      );
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
};

exports.pttQuery = (req, res, next) => {
  // query 搜尋內容
  // 跳過 skip 幾資料
  // sort 針對 time 做排序
  let {
    query, skip, sort,
  } = req.query;

  const { value, error } = Joi.validate(req.query, pttValidate);

  if (error) {
    return next(new handler.QueryError(error.details[0].message));
  }

  // Search Condition
  const queryCondition = [];

  if (value.query) {
    queryCondition.push({
      title: new RegExp(value.query),
    });
  }

  if (value.sort === 'new') {
    sort = -1;
  } else if (value.sort === 'old') {
    sort = 1;
  }

  PttSchema.find({
    $and: queryCondition,
  })
    .sort({
      time: sort,
    })
    .limit(30)
    .skip(Number(value.skip))
    .exec()
    .then((result) => {
      res.status(200).json(
        result,
      );
    })
    .catch((err) => {
    });
};
