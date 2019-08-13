let request = require('request');
const cheerio = require('cheerio');

const BEAUTY_URL = 'https://www.ptt.cc/bbs/Beauty/';

const PostSchema = require('../models/Post');

const beautyOptions = {
  url: BEAUTY_URL,
  method: 'GET',
};


const acceptData = {
  from: '/bbs/Beauty/index.html',
  yes: 'yes',
};

const acceptOver18 = () => {
  // 同意我已滿 18 歲
  const over18Cookie = request.jar();
  // 將 over18Cookie 套用在所有的 Request上
  request = request.defaults({
    jar: over18Cookie,
  });

  request.post({
    url: 'https://www.ptt.cc/ask/over18',
    form: acceptData,
  }, (acceptErr, acceptRes, acceptBody) => {
    // 同意後會收到 Status Code 302
    if (acceptErr || acceptRes.statusCode !== 302) {
      return;
    }
  });
};

// 抓取貼文內容
const getBeautyPostContent = (url) => {
  request.get(`https://www.ptt.cc/${url}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const $ = cheerio.load(body);
    // 移除貼文留言
    $('.push').remove();
    const title = $('#main-content > div:nth-child(3) > span.article-meta-value').text();
    const content = $('#main-container').text();
    const time = $('#main-content > div:nth-child(4) > span.article-meta-value').text();

    const imgUrlArr = [];
    const imgUrl = content.match(/https?:\/\/.*imgur.*/g);
    if (imgUrl) {
      imgUrlArr.push(...imgUrl);
    }

    const insertPostData = new PostSchema.Ptt({
      title,
      content,
      images: imgUrlArr,
      time,
      sourceLink: `https://www.ptt.cc${url}`,
    });

    insertPostData.save((dbErr, result) => {
      if (dbErr) {
        console.log(dbErr);
      }
    });
  });
};

// 抓取每篇貼文的連結
const getBeautyPostLink = (id) => {
  request.get(`https://www.ptt.cc/bbs/Beauty/index${id}.html`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const $ = cheerio.load(body);
    $('#main-container > div.r-list-container.action-bar-margin.bbs-screen > div > div.title > a').each((index, title) => {
      getBeautyPostContent($(title).attr('href'));
    });
  });
};

// 抓取 PTT 看板的頁數連結
const getBeautyTopLink = () => {
  acceptOver18();
  request(beautyOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const $ = cheerio.load(body);
    $('#action-bar-container > div > div.btn-group.btn-group-paging > a:nth-child(2)').each((index, title) => {
      getBeautyPostLink($(title).attr('href').match(/\d+/));
    });
  });
};

module.exports.getBeauty = getBeautyTopLink;
