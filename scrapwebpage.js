const unirest = require('unirest');
const cheerio = require('cheerio');
const pretty = require("pretty");

const selectRandom = () => {
    const userAgents =  ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",     "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",     
   ];
   var randomNumber = Math.floor(Math.random() * userAgents.length);     return userAgents[randomNumber];     
   }     
   let user_agent = selectRandom();     
   let header = {
        "User-Agent": `${user_agent}`,
        "Accept": 'text/html'
     }

    
const scrapwebpage = (header,url,callback) => {
    unirest.get(url)
  .headers(header)
  .end(function (response) {
    const $ = cheerio.load(response.body);
    // $('img').not();
    // $('a').not();
    $('script,br,#respond,table,#mh-comments,.comment,.comment-section,img,li > a,noscript,style,meta,head,input,footer,[document],aside,nav').remove();

    // $("*").filter(function() {
    //     return $(this).text().match(/^[a-zA-Z ]*$/);
    //   }).remove();
    parsed = $.text();
    parsed = parsed.replace(/[^a-zA-Z\d]/g, '');
    //return parsed
    callback(parsed)
      //console.log(parsed)
    // $('p').remove('.aligncenter').each(function() {
    //     console.log($(this).text());
    //   });
});
}
scrapwebpage(header, "https://samurai-gamers.com/persona-5/star-confidant-hifumi-togou/#:~:text=Unlocking%20Hifumi,to%20start%20the%20social%20link.", (parsed) => {
    console.log(parsed);
  });
  