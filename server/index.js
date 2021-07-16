const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.end('Hello Muhaimenul Islam!');

});


app.get('/api/board', (req, res) => {
    res.end('Hello World!');

});


app.post('/api/board', (req, res) => {
    
});

app.post('/api/task', (req, res) => {
    
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));