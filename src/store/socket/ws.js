const ws = new WebSocket('ws://localhost:3001');
ws.addEventListener('open', (event) => {
  ws.send('Hello Server!');
});

// Listen for messages
ws.addEventListener('message', (event) => {
  console.log('Message from server ', event.data);
});
