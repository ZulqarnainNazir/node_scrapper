const scrape = require('website-scraper');
const options = {
  urls: ['https://www.bestell-dein-blech.de/dwt/order/draw?tool=true'],
  directory: 'home_n/',
};
 
// with async/await
const result = scrape(options);
 
// with promise
scrape(options).then((result) => {});
 
// or with callback
scrape(options, (error, result) => {});