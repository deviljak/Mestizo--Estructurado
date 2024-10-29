const path = require('path');

module.exports = {
  entry: './src/app.js', // Archivo de entrada
  output: {
    filename: 'bundle.min.js', // Archivo de salida
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
  },
  mode: 'production', // Modo de producción para minificar
};