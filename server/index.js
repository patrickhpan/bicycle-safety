const express = require('express');
const heatmap = require('./heatmap');
const coordinateToHeatmap = require('./coordinateToHeatmap');

let app = express();

app.get('/coordinate', (req, res) => {
    let lat = Number(req.query.lat);
    let long = Number(req.query.long);

    let hmCoords = coordinateToHeatmap([lat, long]);
    console.log(hmCoords)

    res.end(heatmap[hmCoords[0]][hmCoords[1]]);
})

app.listen(8000)