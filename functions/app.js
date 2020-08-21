const express = require('express');

const cors = require('cors');

const hellowordRouter = require('./routes/helloword.route');
const authRouter = require('./routes/auth.route');

const app = express();
app.use(express.json());

app.use(cors({ origin: true }));
app.use('/hello-world', hellowordRouter);
app.use('/auth', authRouter);

module.exports = app;
