const express = require('express')
const app = express()

const PORT = 8000;

// const server = http.createServer((req, res) => {
//    const path = url.parse(req.url).pathname;
   
//     const method = req.method.toUpperCase();
//     switch (method) {
//         case 'GET':
//             if (path === '/getall') {
//                 const products = [
//                     {
//                         id: 1,
//                         name: 'iphone'
//                     },
//                     {
//                         id: 2,
//                         name: 'samsung'
//                     }
//                 ]
//                 res.end(JSON.stringify(products));
//             }else {
//                 res.end("Not found");
//             }
//             console.log('get');
//             break;
//         case 'POST':
//             console.log('post');
//             break;
//         case 'UPDATE':
//             console.log('update');
//             break;
//         case 'DELETE':
//             console.log('delete');
//             break;
//         default:
//             break;
//     }
// });
const products = [
    {
        id: 1,
        name: 'iphone',
        price : 100000,

    },
    {
        id: 2,
        name: 'samsung',
        price : 200000
    },
    {
        id: 3,
        name: 'xiaomi',
        price : 300000
    },
    {
        id: 4,
        name: 'oppo',
        price : 400000
    }
]

app.get('/', (req, res) => {
    res.send(products);
  })

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(item => item.id == id);
    res.send(product);
  })  

app.post('/create', (req, res) => {
    res.send('Tao san pham thanh cong');
  })
app.put('/update', (req, res) => {
    res.send('Cap nhat san pham thanh cong');
  })
app.delete('/remove', (req, res) => {
    res.send('Xoa san pham thanh cong');
  })
app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
})