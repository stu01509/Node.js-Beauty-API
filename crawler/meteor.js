const request = require('request');

const METEOR_URL = 'https://meteor.today/article/get_new_articles';

const meteorOptions = {
  url: METEOR_URL,
  method: 'POST',
  form: { boardId: '56fcf952299e4a3376892c1f', pageSize: '5' },
};

const getMeteorsellphoto = () => {
  request(meteorOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const allContent = JSON.parse(`${body}`);
    const resultContent = JSON.parse(decodeURI(allContent.result));

    resultContent.forEach((post) => {
      console.log(post);
      const imgUrls = post.content.match(/https?:\/\/.*imgur.*jpg/g);
      console.log(imgUrls);
    });
  });
};

getMeteorsellphoto();
