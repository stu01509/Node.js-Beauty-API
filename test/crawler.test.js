const should = require('should');
const dcard = require('../crawler/dcard');
const meteor = require('../crawler/meteor');

describe('#爬蟲測試', () => {
  it('#Dcard爬蟲 取得回傳的 30 筆資料', (done) => {
    dcard.getDressup()
      .then((res) => {
        should.equal(res, 30, 'OK');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('#Meteor爬蟲 取得回傳的 30 筆資料', (done) => {
    meteor.getMeteorsellphoto()
      .then((res) => {
        should.equal(res, 30, 'OK');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}).timeout(10000);
