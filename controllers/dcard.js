const DcardSchema = require('../models/Post').Dcard;

exports.dcardGetAll = (req, res, next) => {
  // 跳過 skip 幾資料
  const { skip } = req.query;

  DcardSchema.find()
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

exports.dcardQuery = (req, res, next) => {
  // query 搜尋內容
  // sex 性別參數
  // 跳過 skip 幾資料
  // sort 針對 time 做排序
  let {
    query, sex, skip = 0, sort = -1,
  } = req.query;

  // Search Condition
  const queryCondition = [];

  if (query) {
    queryCondition.push({
      title: new RegExp(query),
    });
  }

  if (sex) {
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

  DcardSchema.find({
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
      res.status(500).json({
        err,
      });
    });
};
