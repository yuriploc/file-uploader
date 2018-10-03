const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cfg = require('../knexfile');
const knex = require('knex')(cfg.development);
const csv = require('./csv');

const app = express();

const PORT = 3001;
const upload = multer();

app.post('/uploads', cors(), upload.single('file'), (req, res) => {
  const file = req.file;
  const meta = req.body;

  console.log(file);
  console.log(meta);

  csv.write(file.buffer);
  csv.end();

  // TODO: persist on pg
  // knex('files');
  res.status(200).send({ uploadId: 8298 });
});

app.listen(PORT, _ => console.log(`We're ONLINE on ${PORT}`));
