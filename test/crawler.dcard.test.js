const should = require('should');
const dcard = require('../crawler/dcard');

describe('#Dcard 爬蟲', () => {
  it('文章內容應為字串', (done) => {
    dcard.getDressup()
      .then((res) => {
        should(res.title).be.a.String();
        should(res.content).be.a.String();
        should(res.gender).be.a.String();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('文章內容不為空值', (done) => {
    dcard.getDressup()
      .then((res) => {
        should(res.title).not.be.a.empty();
        should(res.content).not.be.a.empty();
        should(res.gender).not.be.a.empty();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}).timeout(10000);
