const Joi = require('joi');

const DcardSchema = require('../models/Post').Dcard;

const handler = require('.././libs/handler');

const { getAllValidate, dcardValidate } = require('../libs/queryValidate');

exports.dcardGetAll = (req, res, next) => {
  // 跳過 skip 幾資料
  const { value, error } = Joi.validate(req.query, getAllValidate);

  if (error) {
    return next(new handler.QueryError(error.details[0].message));
  }

  DcardSchema.find()
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
      next(new handler.DBError(err));
    });
  return true;
};

exports.dcardQuery = (req, res, next) => {
  // query 搜尋內容
  // sex 性別參數
  // 跳過 skip 幾資料
  // sort 針對 time 做排序
  let { sort } = req.query;

  const { value, error } = Joi.validate(req.query, dcardValidate);

  if (error) {
    return next(new handler.QueryError(error.details[0].message));
  }

  // Search Condition
  const queryCondition = [];

  // 有 query 值的話 Push 這個搜尋條件到 Array queryCondition
  if (value.query) {
    queryCondition.push({
      title: { $regex: value.query, $options: 'i' },
    });
  }

  // 有 sex 值的話 Push 這個搜尋條件到 Array queryCondition
  if (value.sex) {
    queryCondition.push({
      gender: value.sex.toUpperCase(),
    });
  }

  // Sort 參數轉換
  if (value.sort === 'new') {
    sort = -1;
  } else if (value.sort === 'old') {
    sort = 1;
  }

  DcardSchema.find({
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
      next(new handler.DBError(err));
    });
  return true;
};
