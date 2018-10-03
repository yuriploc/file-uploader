const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

const PORT = 3001;

const storage = multer.diskStorage({
  dest: './temp',
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  }
});

const upload = multer({ storage });

app.post('/uploads', cors(), upload.single('file'), (req, res) => {
  const file = req.file;
  const meta = req.body;

  console.log(file);

  // TODO: persist on pg
  res.status(200).send({ uploadId: 8298 });
});

app.listen(PORT, _ => console.log(`We're ONLINE on ${PORT}`));
