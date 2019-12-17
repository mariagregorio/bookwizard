const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users.js')

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// DB Config
const dbOptions = {
    user: process.env.mongoUser,
    pass: process.env.mongoPass,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

//Connect to mongodb
/*mongoose.connect(process.env.mongoURI, dbOptions)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));*/

app.get('/', (req, res) => res.send('Hello'));

app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
