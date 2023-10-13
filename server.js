const http = require('http');
const fs = require('fs');
const path = require('path');

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
    // Obtener la ruta del archivo solicitado
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Si se solicita la raíz, redirige a index.html
    }

    // Obtener la extensión del archivo
    const extname = path.extname(filePath);

    // Mapear tipos de contenido MIME
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    // Leer el archivo solicitado
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado, responder con un error 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                // Otro error, responder con un error 500
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('500 Internal Server Error');
            }
        } else {
            // Archivo encontrado, responder con el contenido
            const contentType = mimeTypes[extname] || 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

// Escuchar en un puerto
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
