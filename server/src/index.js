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

  csv.write(file.buffer);
  csv.end();

  const fileObj = {
    filename: meta.filename,
    file
  };

  knex('files')
    .insert(fileObj, 'fileid')
    .then(ret => res.status(200).send({ uploadId: ret }))
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get('/uploads/:uploadId', cors(), (req, res) => {
  const { uploadId } = req.params;
  knex('files')
    .select()
    .where('fileid', '==', uploadId)
    .then(ret => {
      console.log(ret);
      res.status(200).send(ret);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(PORT, _ => console.log(`We're ONLINE on ${PORT}`));
