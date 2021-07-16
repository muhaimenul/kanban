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

    let dbFilePath = __dirname + '/' + 'data.json'
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        
        let item = {
            id: uuidv4(),
            content: req.body.content
        }


        let lists = JSON.parse(data)

        let firstListIndex = 0;

        let list = lists[Object.keys(lists)[firstListIndex]];
        let items = [...list.items];
        items.push(item)

        lists[list._id] = {
            ...list,
            items: items
        }

        data = JSON.stringify(lists)

        fs.writeFile(dbFilePath, data, 'utf8', function (err) {
            if (err) return console.log(err);
         });

        res.status(200).json(item)
        
    });

});


app.post('/api/board', (req, res) => {
    //TODO:: update board on task status change
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));