import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = (process.env.PORT ?? 5000).toString();
const platform = process.platform;
let __dirname = path.dirname(decodeURI(new URL(import.meta.url).pathname));
if (platform === 'win32') {
    __dirname = __dirname.substring(1);
}
const publicDirectory = path.join(__dirname, 'public');
// Parse JSON from front end
app.use(express.json());
// Enable CORS and serve static files
app.use(cors());
app.use(express.static(publicDirectory));
// Define routes
app.get('/', (_req, res) => {
    const isDevelopment = String(process.env.NODE_ENV) === 'development';
    if (isDevelopment) {
        res.redirect(String(process.env.VITE_FRONTEND_URL));
        return;
    }
    res.sendFile(publicDirectory);
});
app.get('/api', (_req, res) => res.json({ message: path.join(publicDirectory, 'index.html') }));
// Start server
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`${platform.charAt(0).toUpperCase() + platform.slice(1)} is running on http://localhost:${PORT}`);
});
