const express = require('express');
const cors = require('cors');

const config = require('./config');
const productRoute = require('./routes/productRoute');

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', productRoute);

app.listen(config.port, `Server is live @ ${config.hostUrl}`);
