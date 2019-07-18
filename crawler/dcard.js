const request = require('request');

const DCARD_URL = 'https://www.dcard.tw/_api/forums/dressup/posts';

const dcardOptions = {
  url: DCARD_URL,
  method: 'GET',
};

const getDcardDressupPost = (id) => {
  request(`http://dcard.tw/_api/posts/${id}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const content = JSON.parse(body);
    console.log(content);
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

getDcardDressupLink();
