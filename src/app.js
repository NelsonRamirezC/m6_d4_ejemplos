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

//endpoints
app.get("/api/productos", async (req, res) => {
    let data = await leerData();
    
    res.json({data: data.productos, cantidad: data.productos.length });
})


export default app;