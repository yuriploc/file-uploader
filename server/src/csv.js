const parse = require('csv-parse');

const p = (file, cb) => {
  let out = [];
  const parser = parse({
    delimiter: ',',
    trim: true,
    skip_empty_lines: true,
    columns: ['yardCode', 'employeeCode', 'clockIn', 'clockOut'],
    from: 2
  });

  parser.on('readable', () => {
    let record = parser.read();
    while (record) {
      out.push(record);
      record = parser.read();
    }
  });
  parser.on('end', _ => {
    cb(null, out);
  });
  parser.on('error', error => cb(error, out));

  parser.write(file.buffer);
  parser.end();
};

module.exports = {
  parseRows: file =>
    new Promise((resolve, reject) => {
      p(file, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    })
};
