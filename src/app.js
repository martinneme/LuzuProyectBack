import express from 'express';
import FileManager from './model/productsManager.js'

const app = express();

const productsManager = new FileManager('./db/products.txt')

app.get('/products',async (req,res)=>{
    const limit = parseInt(req.query.limit);
    const products = await productsManager.getsProducts()
    res.send(limit ? products.slice(0,limit) : products)
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

app.listen(8080,()=>{
    console.log("Express Server listening on PORT 8080")
})