const express = require('express');
const bot     = require('./controllers/slack.js');

const port = process.env.PORT || 4000;
const app = express();

app.get('/', (req, res) => {
  res.type('application/json');
  res.status(200).json({
    now: new Date().getTime(),
  });
});

app.listen(port, () => {
  console.log(`[🌎 WEB] Server listening on port ${port}`);
});
