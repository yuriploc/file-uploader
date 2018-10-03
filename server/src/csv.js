const parse = require('csv-parse');

const csv = parse({
  skip_empty_lines: true,
  trim: true,
  columns: true
});

let out = [];

csv.on('readable', () => {
  let record = csv.read();
  while (record) {
    out.push(record);
    record = csv.read();
  }
});

csv.on('end', _ => {
  // console.log(out);
});

module.exports = csv;
