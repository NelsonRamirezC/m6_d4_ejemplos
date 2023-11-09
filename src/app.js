import express from "express";
import fs from "fs";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const leerData = async () => {
    let rutaArchivo = path.join(__dirname, "/data/productos.json");
    let datos = fs.readFileSync(rutaArchivo, "utf8");
    return JSON.parse(datos);
}

//endpoints todos los productos
app.get("/api/productos", async (req, res) => {
    let data = await leerData();
    
    res.json({data: data.productos, cantidad: data.productos.length });
})

//endpoint devolver productos por id
app.get("/api/productos/filter/id", async (req, res) => {
    let data = await leerData();
    let productos = data.productos;
    let {id} = req.query;
    
    let productoBuscado = productos.find(producto => producto.id == id);

    if(productoBuscado){
        res.json({producto: productoBuscado})
    }else{
        res.status(404).json({code: 404, message: "Producto no encontrado."});
    }
})


export default app;