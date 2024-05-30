// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const swaggerSetup = require('./swagger');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

swaggerSetup(app);

app.use('/auth', require('./routes/auth'));
app.use('/api/nft', require('./routes/nft'));
app.use('/api/collection', require('./routes/collection'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
