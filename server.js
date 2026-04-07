import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Sirve archivos estáticos
app.use(express.static(__dirname));

// IMPORTANTE: Para SPA (Single Page Application)
// Todas las rutas que no sean archivos estáticos deben servir index.html
app.get('*', (req, res) => {
  // Si es una solicitud a un archivo con extensión, no sirvas index.html
  if (path.extname(req.path)) {
    res.status(404).send('Archivo no encontrado');
  } else {
    // Para todas las demás rutas, sirve index.html
    // El Router del cliente se encargará de manejar la ruta
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📁 Directorio: ${__dirname}`);
});
