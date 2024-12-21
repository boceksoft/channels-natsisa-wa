import pkg from "whatsapp-web.js";
import qrcode from "qrcode";

const sessionsPath = './sessions';
const clients = [];

const { Client, LocalAuth } = pkg;

export const createClient = (userId) => {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: userId,
            dataPath: sessionsPath,
        }),
    });

    
    client.on("qr", (qr) => {
        console.log(`Kullanıcı ${userId} için QR kod alındı.`);
        const instance = clients[userId];
        instance.qr = qr;
        clients[userId] = instance;

        console.log(clients[userId].qr);
        // qrcode.toString(qr, { type: "terminal" }, (err, url) => {
        //     if (err) console.error(err);
        //     console.log(url);
        // });
    });

    client.on("ready", () => {
        console.log(`Kullanıcı ${userId} için WhatsApp bağlandı!`);
    });

    client.on("message", (message) => {
        console.log(`Kullanıcı ${userId} için yeni mesaj alındı:`);
        console.log(`Gönderen: ${message.from}`);
        console.log(`Mesaj: ${message.body}`);
    });

    client.initialize();

    clients[userId] = {
        instance: client,
        qr: null,
    };
};

export const getClient = (userId) => {
    return clients[userId] || null;
};

export const getActiveClients = () => {
    return Object.keys(clients);
};
