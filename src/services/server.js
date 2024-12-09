const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs'); // Para leer el archivo JSON

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 4000;

let jugadores = [];

// Cargar jugadores del archivo db.json (simulando la base de datos)
const loadJugadores = () => {
  fs.readFile('db.json', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }
    jugadores = JSON.parse(data).usuarios; // Suponiendo que los usuarios están en la propiedad "usuarios"
  });
};

// Escucha las conexiones de los clientes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Cargar jugadores al momento de la conexión
  loadJugadores();

  // Enviar los jugadores al cliente cuando se conecta
  socket.emit('jugadores', jugadores);

  // Escuchar el evento de actualización de carta seleccionada
  socket.on('actualizarCartaSeleccionada', (data) => {
    const { jugadorId, cartaSeleccionada } = data;
    jugadores = jugadores.map((jugador) =>
      jugador.id === jugadorId ? { ...jugador, cartaSeleccionada } : jugador
    );

    // Emitir a todos los clientes la actualización
    io.emit('jugadores', jugadores);

    // Actualizar el archivo JSON (simulando una base de datos)
    fs.writeFile('db.json', JSON.stringify({ usuarios: jugadores }), (err) => {
      if (err) {
        console.error('Error al guardar en el archivo:', err);
      }
    });
  });

  // Manejar desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor Socket.io en puerto ${PORT}`);
});
