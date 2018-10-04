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
  const { file } = req;
  const { filename } = req.body;

  csv.parseRows(file).then(parsedRows =>
    knex('uploads')
      .insert({ filename }, 'uploadId')
      .then(([uploadId]) => {
        const rows = parsedRows.map(r => ({ uploadId, ...r }));
        knex
          .batchInsert('shifts', rows, rows.length)
          .returning('uploadId')
          .then(ids => {
            res.status(200).send({ uploadId: ids[0] });
          })
          .catch(error => console.log(error));
      })
  );
});

app.get('/uploads/:uploadId', cors(), (req, res) => {
  const { uploadId } = req.params;
  knex('uploads')
    .select()
    .leftJoin('shifts', 'uploads.uploadId', 'shifts.uploadId')
    .where('uploads.uploadId', '=', uploadId)
    .then(ret => {
      res.status(200).send(ret);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(PORT, _ => console.log(`We're ONLINE on ${PORT}`));
