import productManager from '../dao/DB/ProductManager.js';
import chatManager from '../dao/DB/chatManager.js';

async function getAllProductsHandler(io, socket) {
  socket.on('getAllProducts', async () => {
    const products = await productManager.getProducts();
    io.sockets.emit('updatedProducts', products.payload);
  });
}

async function messagesHandler(io, socket) {
  socket.on('messageSent', async (message) => {
    await chatManager.create(message);
    const messages = await chatManager.getAll();
    io.sockets.emit('newMessages', messages);
  });

  socket.on('getMessages', async () => {
    const messages = await chatManager.getAll();
    io.sockets.emit('newMessages', messages);
  });
}

export { getAllProductsHandler, messagesHandler };
