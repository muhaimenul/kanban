const express = require('express');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs')

const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.end('Hello Muhaimenul Islam!');
});


app.get('/api/board', (req, res) => {
    fs.readFile(__dirname + '/' + 'data.json', 'utf8', (err, data) => {
        res.end(data);
    });
});


app.post('/api/task', (req, res) => {
    //TODO:: store in db
    res.status(200).json({
        id: uuidv4(),
        content: req.body.content
    })
});


app.post('/api/board', (req, res) => {
    //TODO:: update board on task status change
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));