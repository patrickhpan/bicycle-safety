const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const FILEPATH = '../data/heatmap.csv';

module.exports = parse(fs.readFileSync(FILEPATH, 'utf8'))