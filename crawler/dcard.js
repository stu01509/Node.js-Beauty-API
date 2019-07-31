const request = require('request');

const DCARD_URL = 'https://www.dcard.tw/_api/forums/dressup/posts';

const PostSchema = require('../models/Post');

const dcardOptions = {
  url: DCARD_URL,
  method: 'GET',
};

const getDcardDressupPost = (id) => {
  request(`http://dcard.tw/_api/posts/${id}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const post = JSON.parse(body);

    const imgUrlArr = [];
    const imgUrl = post.content.match(/https?:\/\/.*imgur.*/g);
    if (imgUrl) {
      imgUrlArr.push(...imgUrl);
    }

    const insertPostData = new PostSchema.Dcard({
      title: post.title,
      content: post.content,
      images: imgUrlArr,
      school: post.school,
      department: post.department,
      gender: post.gender,
      tag: post.topics,
      time: post.createdAt,
      sourceLink: `https://www.dcard.tw/_api/posts/${post.id}`,
    });

    insertPostData.save((dbErr, result) => {
      if (dbErr) {
        console.log(dbErr);
      }
    });
  });
};

const getDcardDressupLink = () => {
  request(dcardOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const allContent = JSON.parse(body);
    allContent.forEach(item => getDcardDressupPost(item.id));
  });
};

module.exports.getDressup = getDcardDressupLink;
