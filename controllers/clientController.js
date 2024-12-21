import { createClient, getClient, getActiveClients } from "../services/clientService.js";
import { fetchUsers } from "../services/userService.js";
import qrcode from "qrcode";

export const initializeClients = async () => {
    try {
        const users = await fetchUsers();
        if (!users) 
            throw new Error("Kullanıcılar alınırken hata oluştu.");

        users.forEach(user => {
            if (user.userId) {
                createClient(user.userId);
            }
        });

        console.log("Tüm kullanıcılar için istemciler başlatıldı.");
    }
    catch (error) {
        console.error("Kullanıcılar için istemciler oluşturulamadı:", error);
    }
};

export const getQrCode = async (req, res) => {
    const { userId } = req.params;
    const client = getClient(userId);

    if (!client) {
        return res.status(404).send("Bu kullanıcı için istemci bulunamadı.");
    }

    try {
        const qrCode = await new Promise((resolve, reject) => {
            qrcode.toDataURL(client.qr, (err, url) => {
                if (err) return reject(err);
                resolve(url);
            });
        });

        res.json({ qr: qrCode });
    } catch (error) {
        console.error("QR kod oluşturulamadı:", error);
        res.status(500).send("QR kod oluşturulamadı.");
    }
};

export const listSessions = (req, res) => {
    const activeUsers = getActiveClients();
    res.json({ activeUsers });
};
