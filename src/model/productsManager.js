import { promises as fs } from "fs";

export default class FileManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    return await fs.readFile(this.path, "UTF-8").catch((e) => {
      if (e.code === "ENOENT") {
        throw "Archivo no encontrado";
      }
      if (e instanceof TypeError) {
        throw "TypeError - Es posible que el archivo que intenta abrir no corresponda a la codificacion esperada";
      } else {
        throw "error";
      }
    });
  }

  async writeFile(content) {
    return await fs.writeFile(this.path, content).catch((e) => {
      if (e.code === "ENOENT") {
        throw "File not found!";
      } else {
        throw e;
      }
    });
  }

  async lastID() {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const lastElement = contentText[contentText.length - 1];
    return (await lastElement.id) + 1;
  }

  async addProduct(obj) {
    try {
      if (
        (!obj.title,
        !obj.description,
        !obj.price,
        !obj.thumbnail,
        !obj.code,
        !obj.stock)
      ) {
        throw new Error(
          "se esperan las propiedades title, description, price, thumbnail, code y  stock"
        );
      } else {
        const content = await this.readFile();
        const contentText = await JSON.parse(content);
        contentText.length ? (obj.id = await this.lastID()) : (obj.id = 0);
        const product = {
          ...obj,
        };

        contentText.push(product);

        await this.writeFile(JSON.stringify(contentText));
        console.log("Se ha ingresado el producto correctamente");
      }
    } catch (e) {
       console.log(e)

    }
  }

  async getsProducts() {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    return contentText;
  }

  async getProductById(id) {
    try{
        const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const product = contentText.find((element) => element.id == id);
    if(!product){
        throw new Error()
    }
    return product; 
    }catch(error){
        const myError = new Error('Producto no encontrado');
        myError.details = {code: 404, message: 'Producto no encontrado'};
        throw myError;
        
    }   
   
  }

  async updateProduct(id, propertys) {
    try {
      const content = await this.readFile();
      const contentText = await JSON.parse(content);
      let product = contentText.find((element) => element.id == id);
      if (!product) {
        throw new Error(`El producto ${id} no existe`);
      }
      Object.keys(propertys).forEach(prop=>{
        if(prop !== 'id'){
            product[prop] = propertys[prop]
        }
      })
      await this.writeFile(JSON.stringify(contentText))
    console.log(`la/s propiedad/es ${Object.keys(propertys)} del producto id:${id} fueron actualizadas`);
     
    } catch (e) {
        if(typeof error == 'undefined'){
            console.log(`No fue posible actualizar el produto ${id}, asegurese que sea el correcto`);
        }
    }
  }


  async deleteProduct(id) {
    try {
const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const productIndex =  await contentText.findIndex((element) => element.id === id);
    if(productIndex === -1){
      throw new error(`El producto id:${id} no existe`)
    }else{
     contentText.splice(productIndex,1)
     await this.writeFile(JSON.stringify(contentText))
     console.log(`El producto id:${id} fue eliminado`)
    }
    }catch(e){
        if(typeof error == 'undefined'){
            console.log(`No fue posible eliminar el produto ${id}, asegurese que sea el correcto`);
        }
    }
  }
}