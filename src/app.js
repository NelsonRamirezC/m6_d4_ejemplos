import express from "express";
import fs from "fs";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


//rutas de vista
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

const leerData = async () => {
    let rutaArchivo = path.join(__dirname, "/data/productos.json");
    let datos = fs.readFileSync(rutaArchivo, "utf8");
    return JSON.parse(datos);
}

//endpoints todos los productos
app.get("/api/productos", async (req, res) => {
    let data = await leerData();
    res.json({productos: data.productos, cantidad: data.productos.length });
})

//endpoint devolver productos por id
app.get("/api/productos/filter/id", async (req, res) => {
    let data = await leerData();
    let productos = data.productos;
    //obtenemos de la petición del cliente el parámetro id
    let {id} = req.query;
    
    //utilizamos el método find de los arrays para buscar el producto
    //si lo encuentra devuelve el elemento, de lo contrario retorna un undefined
    let productoBuscado = productos.find(producto => producto.id == Number(id));

    if(productoBuscado){
        res.json({producto: productoBuscado})
    }else{
        res.status(404).json({code: 404, message: "Producto no encontrado."});
    }
})


//endpoint filtrado por nombre
app.get("/api/productos/filter/nombre", async (req, res) => {
    let data = await leerData();
    let productos = data.productos;
    let {nombre} = req.query;

    if(nombre){
        //filtro busqueda por nombre exacto
        //let filtroProductos = productos.filter(producto => producto.nombre.toLowerCase() == nombre.toLowerCase());
        
        //filtro busqueda por nombre que inicie con...
        /* let filtroProductos = productos.filter(producto => producto.nombre.toLowerCase().startsWith(nombre.toLowerCase())); */

        //filtro por patrón usando regex
        let regexNombre = new RegExp(nombre, "i");

        /* console.log(typeof  regexNombre);
        console.log(regexNombre); */

        let filtroProductos = productos.filter(producto => regexNombre.test(producto.nombre));
    
        res.json({productos: filtroProductos, cantidad: filtroProductos.length });
    }else {
        res.json({productos, cantidad: productos.length });
    }


})




export default app;