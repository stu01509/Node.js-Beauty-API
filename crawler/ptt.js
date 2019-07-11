const request = require('request');
const cheerio = require('cheerio');

const BEAUTY_URL = 'https://www.ptt.cc/bbs/Beauty/';

const beautyOptions = {
  url: BEAUTY_URL,
  method: 'GET',
};

const getBeautyPostContent = (url) => {
  request.get(`https://www.ptt.cc/${url}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return;
    }
    const $ = cheerio.load(body);
    $('.push').remove();
    $('#main-container').each((index, content) => {
      const imgUrls = $(content).text().match(/https?:\/\/.*imgur.*jpg/g);
      console.log($(content).text());
      console.log(imgUrls);
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

getBeautyTopLink();
