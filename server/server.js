require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 5000;

app.use('/health', (req, res) => {
  res.send('Hello, everything is fine');
});

routes(express, app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
