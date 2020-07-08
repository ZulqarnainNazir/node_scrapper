const scrape = require('website-scraper');
const options = {
  urls: ['http://cvresumetemplate.com/maha-personal-cv-resume-html-template/home-three.html'],
  directory: 'home/',
};
 
// with async/await
const result = scrape(options);
 
// with promise
scrape(options).then((result) => {});
 
// or with callback
scrape(options, (error, result) => {});