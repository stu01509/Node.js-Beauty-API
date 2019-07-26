const MeteorSchema = require('../models/Post').Meteor;

const handler = require('.././libs/handler');

exports.meteorGetAll = (req, res, next) => {
  // 跳過 skip 幾資料  
  const { skip = 0 } = req.query;

  if (isNaN(skip)) {
    return next(new handler.QueryError('"skip" must be a number'));
  }

  MeteorSchema.find()
    .sort({
      time: -1,
    })
    .limit(30)
    .skip(Number(skip))
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

exports.meteorQuery = (req, res, next) => {
  // query 搜尋內容
  // sex 性別參數
  // 跳過 skip 幾資料
  // sort 針對 time 做排序
  let {
    query, sex, skip = 0, sort = 'new',
  } = req.query;

  if (isNaN(skip)) {
    return next(new handler.QueryError('"skip" muse be a number'));
  }

  // Search Condition
  const queryCondition = [];

  if (query) {
    queryCondition.push({
      title: new RegExp(query),
    });
  }

  if (sex) {
    if (sex !== 'm' && sex !== 'M'
      && sex !== 'f' && sex !== 'F') {
      return next(new handler.QueryError('"sex" muse be one of [m, f, M, F]'));
    }
    queryCondition.push({
      gender: sex.toUpperCase(),
    });
  }

  if (sort === 'new') {
    sort = -1;
  } else if (sort === 'old') {
    sort = 1;
  }

  if (queryCondition.length === 0) {
    res.status(200).json(
      [],
    );
  }

  MeteorSchema.find({
    $and: queryCondition,
  })
    .sort({
      time: sort,
    })
    .limit(30)
    .skip(Number(skip))
    .exec()
    .then((result) => {
      res.status(200).json(
        result,
      );
    })
    .catch((err) => {
    });
};
