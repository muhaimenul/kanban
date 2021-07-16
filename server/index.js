const express = require('express');
const fs = require('fs')

const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors())

app.get('/', (req, res) => {
    res.end('Hello Muhaimenul Islam!');

});


app.get('/api/board', (req, res) => {
    fs.readFile(__dirname + '/' + 'data.json', 'utf8', (err, data) => {
        res.end(data);
    });
});


app.post('/api/board', (req, res) => {
    
});

app.post('/api/task', (req, res) => {
    
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));