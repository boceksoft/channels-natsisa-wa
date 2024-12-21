import axios from "axios"
import { backendUrl } from "../helpers/backendUrl.js"

export const fetchUsers = async () => {
    try {
        const response = await axios.get(backendUrl("whatsapp/users"));
        return response.data
    }
    catch (error) {
        console.error("Kullanıcılar alınırken hata oluştu:", error);
    }
}