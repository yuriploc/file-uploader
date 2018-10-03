const express = require('express');
const cors = require('cors');
const multer = require('multer');
const parse = require('csv-parse');

const app = express();

const PORT = 3001;
const upload = multer();

app.post('/uploads', cors(), upload.single('file'), (req, res) => {
  const file = req.file;
  const meta = req.body;
  let saida = [];
  let count = 0;

  // console.log(file);
  // console.log(meta);
  const csv = parse({
    skip_empty_lines: true,
    trim: true,
    columns: true
  });

  csv.write(file.buffer);
  csv.end();

  csv.on('readable', () => {
    let record = csv.read();
    while (record) {
      saida.push(record);
      record = csv.read();
    }
  });

  csv.on('end', something => {
    console.log(saida);
  });

  // TODO: persist on pg
  res.status(200).send({ uploadId: 8298 });
});

app.listen(PORT, _ => console.log(`We're ONLINE on ${PORT}`));
