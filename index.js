const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/password', require('./routes/password'));
// app.use('/queue', require('./routes/queue'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
