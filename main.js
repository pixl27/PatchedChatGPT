// import { ChatGPTAPIBrowser } from 'chatgpt'
const unirest = require("unirest");
const cheerio = require("cheerio");
let globalcheck = 0

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
   let headergoogle = {
    "User-Agent": `${user_agent}`
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

getOrganicData = (searchprompt,headers,callback) => {
  searchprompt = searchprompt.replace(/[^a-zA-Z\d]/g, '+')
  return unirest
    .get("https://www.google.com/search?q="+searchprompt+"&gl=us&hl=en")
    .headers(headers)
    .then((response) => {
      let $ = cheerio.load(response.body);

      let titles = [];
      let links = [];
      let snippets = [];
      let displayedLinks = [];

      $(".yuRUbf > a > h3").each((i, el) => {
        titles[i] = $(el).text();
      });
      $(".yuRUbf > a").each((i, el) => {
        links[i] = $(el).attr("href");
      });
      $(".g .VwiC3b ").each((i, el) => {
        snippets[i] = $(el).text();
      });
      $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
        displayedLinks[i] = $(el).text();
      });

      const organicResults = [];

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
      callback(organicResults[0]["links"])
    
    });
};


var readline = require('readline');
var log = console.log;
api = null
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function recursiveAsyncReadLine () {
  rl.question('Command: ', async function (answer) {
    if (answer == 'exit') //we need some base case, for recursion
      return rl.close(); //closing RL and returning from function.
      //  const response = await  this.api.sendMessage(answer)
      // console.log(response)
      if(globalcheck==0){
        initchatGPT(answer)
        console.log(globalcheck + " up ")
      }
      else {
        asnwer(answer)
      }

    //recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

async function initchatGPT(question) {
  const {ChatGPTAPIBrowser} = await import('chatgpt')

   api = new ChatGPTAPIBrowser({
    email: "one2king1@gmail.com",
    password: "Maherylepro1"
  })

  globalcheck++
  await api.init()
  //const result = await api.sendMessage('Hello World!')
  let user_agent = selectRandom();     
  let header = {
       "User-Agent": `${user_agent}`,
       "Accept": 'text/html'
    }  
    let headergoogle = {
     "User-Agent": `${user_agent}`
  }
  getOrganicData(question,headergoogle, (data) => {
  scrapwebpage(header,data ,async (data2) => {
    const result = await api.sendMessage('Summarize this and tell me ' + question + " :"+ data2 )
    console.log(result)
    recursiveAsyncReadLine()
  });});
}

async function asnwer(question) {
  //const result = await api.sendMessage('Hello World!')
  let user_agent = selectRandom();     
  let header = {
       "User-Agent": `${user_agent}`,
       "Accept": 'text/html'
    }  
    let headergoogle = {
     "User-Agent": `${user_agent}`
  }
  getOrganicData(question,headergoogle, (data) => {
  scrapwebpage(header,data ,async (data2) => {
    const result = await api.sendMessage('Summarize this and tell me ' + question + " :"+ data2 )
    console.log(result)
    recursiveAsyncReadLine()
  });});
}

recursiveAsyncReadLine(); 
// getOrganicData("How to unlock Hifumi Togo in Persona 5",headergoogle, (data) => {
//   scrapwebpage(header,data ,(data2) => {
//     console.log(data2);
//   });});
//"How to unlock Hifumi Togo in Persona 5"