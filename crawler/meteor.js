const request = require('request');

const METEOR_URL = 'https://meteor.today/article/get_new_articles';

const PostSchema = require('../models/Post');

const meteorOptions = {
  url: METEOR_URL,
  method: 'POST',
  form: { boardId: '56fcf952299e4a3376892c1f', pageSize: '30' },
};

const getMeteorsellphoto = () => {
  request(meteorOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const allContent = JSON.parse(`${body}`);
    const resultContent = JSON.parse(decodeURI(allContent.result));

    resultContent.forEach((post) => {
      const imgUrlArr = [];
      const imgUrl = post.content.match(/https?:\/\/.*imgur.*jpg/g);
      if (imgUrl) {
        imgUrlArr.push(...imgUrl);
      }

      const insertPostData = new PostSchema.Meteor({
        title: post.title,
        content: post.content,
        images: imgUrlArr,
        school: post.authorSchoolName,
        gender: post.authorGender,
        time: post.createdAt,
        sourceLink: `https://meteor.today/article/${post.shortId}`,
      });

      insertPostData.save((dbErr, result) => {
        if (dbErr) {
          console.log(dbErr);
        }
      });
    });
  });
};

module.exports.getMeteorsellphoto = getMeteorsellphoto;
