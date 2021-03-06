const fs=require('fs');
const http=require('http');
 const url=require('url');

const output=fs.readFileSync(`${__dirname}/data/data.json`,'utf-8')
const laptopData=JSON.parse(output)
console.log(laptopData)



const server=http.createServer((req,res)=>{
               
 /////////////////////////////////////////////////////////////////////
 //////////URL              
               
               
                    //Analyze url
//    const query= url.parse(req.url,true)   //pathname in an object req.url
//   console.log(query)
const pathName= url.parse(req.url,true).pathname;   //pathname in an object req.url
//   console.log(pathName)

//////////////////////////////////////////////////
//Create id
// //query is id is equal to 1,2,3,4,5
// const query=url.parse(req.url,true).query;
const id=url.parse(req.url,true).query.id;
// console.log(url.parse(req.url,true))

//parse is actually url and query string
// laptop?id=4&name=laptop&name=today

//Url Implementing
// url.parse()
// console.log(req.url) //All information of url in terminal
// console.log(req) //All information each time of get request data we use in terminal


/////////////////////////////////////////////////////////////
///////////Routing

if(pathName==='/products' || pathName==='/')
{
    res.writeHead(200,{
     'Content-type':'text/html',
})
  res.end('This is Products')
}
else if(pathName==='/laptop' && id < laptopData.length){ //laptop is an array is basically 5 objects
  res.end(`This is the Laptop page ${id}!`)
  res.writeHead(200,{
     'Content-type':'text/html',
    
})
}
else{
    res.writeHead(404,{
     'Content-type':'text/html',
    'my-own-header':'Hello world'
})
    res.end("Page Not Found")
}








////////////////////////////////////////////////////////////////////////////////////////////////
//Server
res.writeHead(200,{
     'Content-type':'text/html',
    'my-own-header':'Hello world'
})
 res.end("<h1>Request Server</h1>") //Some one page and see

//respond to end of browser
})






server.listen(3000,'127.0.0.1',()=>{ //localhost ip
    console.log("Listening for request now")
})