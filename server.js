const http = require('http');
const url = require('url');
const PORT = 8000;

const server = http.createServer((req, res) => {
   const path = url.parse(req.url).pathname;
   
    const method = req.method.toUpperCase();
    switch (method) {
        case 'GET':
            if (path === '/getall') {
                const products = [
                    {
                        id: 1,
                        name: 'iphone'
                    },
                    {
                        id: 2,
                        name: 'samsung'
                    }
                ]
                res.end(JSON.stringify(products));
            }else {
                res.end("Not found");
            }
            console.log('get');
            break;
        case 'POST':
            console.log('post');
            break;
        case 'UPDATE':
            console.log('update');
            break;
        case 'DELETE':
            console.log('delete');
            break;
        default:
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
})