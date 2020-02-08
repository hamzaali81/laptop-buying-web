const fs = require('fs');
const http = require('http');
const url = require('url');

const output = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(output)
console.log(laptopData)



const server = http.createServer((req, res) => {

  /////////////////////////////////////////////////////////////////////
  //////////URL              


  //Analyze url
  //    const query= url.parse(req.url,true)   //pathname in an object req.url
  //   console.log(query)
  const pathName = url.parse(req.url, true).pathname;   //pathname in an object req.url
    // console.log(pathName)

  //////////////////////////////////////////////////
  //Create id
  // //query is id is equal to 1,2,3,4,5
  // const query=url.parse(req.url,true).query;
  const id = url.parse(req.url, true).query.id;
  // console.log(url.parse(req.url,true))

  //parse is actually url and query string
  // laptop?id=4&name=laptop&name=today

  //Url Implementing
  // url.parse()
  // console.log(req.url) //All information of url in terminal
  // console.log(req) //All information each time of get request data we use in terminal


  /////////////////////////////////////////////////////////////
  ///////////Routing

  ////////Product Detail

  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    // res.end('This is Products')
    fs.readFile(`${__dirname}/templates/template-overview.htm`, 'utf-8', (err, data) => {
      //Passing string
    // let output=data;
    let overviewOutput=data;
    fs.readFile(`${__dirname}/templates/template-card.htm`, 'utf-8', (err, data) => {
    const cardsOutput= laptopData.map(el=> replaceTemplate(data,el)).join('') //map is an array method which move an array in iterator
    //join convert html format 
    // console.log(cardsOutput)
    overviewOutput=overviewOutput.replace('{%CARDS%}',cardsOutput)


      // res.end(data)
      res.end(overviewOutput)
     
  })
  })

  }
  ///////////////////////////////////////////////
  //laptop Detail

  else if (pathName === '/laptop' && id < laptopData.length) { //laptop is an array is basically 5 objects
    //   res.end(`This is the Laptop page ${id}!`)
    res.writeHead(200, { 'Content-type': 'text/html' })

    fs.readFile(`${__dirname}/templates/template-laptop.htm`, 'utf-8', (err, data) => {
      // In a string that variable replace placeholder
      const laptop = laptopData[id];
      const output = replaceTemplate(data, laptop)
      // let output=data.replace(/{%PRODUCTNAME%}/g,laptop.productName); //replace string method
      //  output=output.replace(/{%IMAGE%}/g,laptop.image);
      //  output=output.replace(/{%PRICE%}/g,laptop.price) ; 
      //  output=output.replace(/{%SCREEN%}/g,laptop.screen); 
      //  output=output.replace(/{%CPU%}/g,laptop.cpu); 
      //  output=output.replace(/{%STORAGE%}/g,laptop.storage) ;
      //  output=output.replace(/{%RAM%}/g,laptop.ram) ;
      //  output=output.replace(/{%DESCRIPTION%}/g,laptop.description); 
      res.end(output)
    })
   res.writeHead(200, {
       'Content-type': 'text/html',

     })
  }
     ////////Another Route
    /////////Images use google like regular expression 
    /////Regular expressinon  work
    // Regular expression /\.(|||/)
    //real world application error handling
    else if((/\.(jpg|png|jpeg|gif)$/i).test(pathName)){
     fs.readFile(`${__dirname}/data/img${pathName}`,(err,data)=>{
       res.writeHead(200,{'Content-type':'image/jpg'})
       res.end(data)

     })    //Character encoding
    }

    
  

  //Page Not Found!
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello world'
    })
    res.end("Page Not Found")
  }








  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Server
  res.writeHead(200, {
    'Content-type': 'text/html',
    'my-own-header': 'Hello world'
  })
  //  res.end("<h1>Request Server</h1>") //Some one page and see

  //respond to end of browser
})






server.listen(3000, '127.0.0.1', () => { //localhost ip
  console.log("Listening for request now")
})

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName); //replace string method
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%ID%}/g, laptop.id);
  return output;

}
