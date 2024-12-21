import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fs from "fs";
import { initializeClients, getQrCode, listSessions } from "./controllers/clientController.js";

// Mevcut ortamı belirle
const ENV = process.env.NODE_ENV || "development";
const envFilePath = `.env.${ENV}`;

if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
    console.log(`Yüklenen ortam: ${ENV}`);
} else {
    console.error(`Ortam dosyası bulunamadı: ${envFilePath}`);
    process.exit(1);
}

const app = express();
app.use(bodyParser.json());

initializeClients();

console.log(`Backend URL: ${process.env.BACKEND_URL}`);

app.get("/qr/:userId", getQrCode);
app.get("/sessions", listSessions);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
