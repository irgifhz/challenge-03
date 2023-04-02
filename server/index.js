const http = require('http');
const PORT = 8000;

const fs = require('fs');
const path = require('path');
const url = require('url');
const { Console } = require('console');

console.log('__dirname', __dirname)
const PUBLIC_DIRECTORY = path.join(__dirname, '../public'); 

// request handler
function onRequest(req, res){

    // parse URL
    const parseUrl = url.parse(req,url);
    let pathUrl = parsedUrl.pathname

    const ext = path.parse(parseUrl).ext;

    console.log(ext);

    const htmlFile = path.join(PUBLIC_DIRECTORY, 'cari-mobil.html');

    const html = fs.readFileSync(htmlFile, 'utf-8');

    // console.log(req,url);
    res.setHeader('Content-Type', 'text/html')
    // console.log('request', req)
    res.writeHead(200);
    res.end(html);
}

const server = http.createServer(onRequest);

server.listen(PORT, '127.0.0.1', ()=>{
    console.log("Server sudah berjalan, silahkan dibuka http://127.0.0.1:%d", PORT);
})