export const backendUrl = (url) => {
    const backendUrl = process.env.BACKEND_URL;

    return `${backendUrl}/${url}`    
} 