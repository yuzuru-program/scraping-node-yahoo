const fetch = require('node-fetch');
const cheerio = require('cheerio');

const main = async () => {
  // https://www.yahoo.co.jp/にリクエスト投げる
  const _ret = await fetch('https://www.yahoo.co.jp/', {
    method: 'get',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    },
    referrer: '',
  }).catch((err) => {
    console.log(err);
  });

  if (_ret.status !== 200) {
    console.log(`error status:${_ret.status}`);
    return;
  }

  // jqueryチックに使えるように変換
  const $ = cheerio.load(await _ret.text());

  const _li = $('main article section ul').eq(0).find('li');

  // ヤフートップニュースを表示
  _li.map(function (i) {
    console.log(_li.eq(i).text());
    console.log(_li.eq(i).find('a').attr()['href']);
    console.log();
  });
};

main();
