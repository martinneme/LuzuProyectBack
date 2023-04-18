import express from 'express';
import FileManager from './src/model/productsManager.js'
import path from "path"

const port = process.env.PORT || 3000;

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


  app.use(express.static(new URL('./public', import.meta.url).pathname));
const pathee= new URL('./public', import.meta.url).pathname;


const productsManager = new FileManager('./src/db/frases.json')

app.get('/products',async (req,res)=>{
  try{
    const limit = parseInt(req.query.limit);
    const products = await productsManager.getsProducts()
    res.send(limit ? products.slice(0,limit) : products)
  }catch(e){
    console.log("fallo porque:"+e)
  }
    
})

app.get('/products/:pid',async (req,res)=>{
    const pid = parseInt(req.params.pid);
    try{
      const product = await productsManager.getProductById(pid)
    res.send(product);  
    }catch(error){
         res.status(404).send(error.details);
    }
    
})

app.listen(port,()=>{
    console.log("Express Server listening on PORT 8080")
})

