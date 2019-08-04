const request = require('request');

const METEOR_URL = 'https://meteor.today/article/get_new_articles';

const PostSchema = require('../models/Post');

const meteorOptions = {
  url: METEOR_URL,
  method: 'POST',
  form: { boardId: '56fcf952299e4a3376892c1f', pageSize: '30' },
};

const getMeteorsellphoto = () => new Promise((resolve, reject) => {
  request(meteorOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      reject();
      return;
    }
    const allContent = JSON.parse(`${body}`);
    const resultContent = JSON.parse(decodeURI(allContent.result));

    resultContent.forEach((post) => {
      const imgUrlArr = [];
      const imgUrl = post.content.match(/https?:\/\/.*imgur.*/g);
      if (imgUrl) {
        imgUrlArr.push(...imgUrl);
      }

      let gender = '';
      if (post.authorGender === 'male') {
        gender = 'M';
      } else if (post.authorGender === 'female') {
        gender = 'F';
      }

      const insertPostData = new PostSchema.Meteor({
        title: post.title,
        content: post.content,
        images: imgUrlArr,
        school: post.authorSchoolName,
        gender,
        time: post.createdAt,
        sourceLink: `https://meteor.today/article/${post.shortId}`,
      });

      insertPostData.save((dbErr, result) => {
        if (dbErr) {
          console.log(dbErr);
        }
      });
    });
    resolve(resultContent.length);
  });
});

module.exports.getMeteorsellphoto = getMeteorsellphoto;
