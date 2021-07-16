const express = require('express');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs')

const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// temporary db
const dbFilePath = __dirname + '/' + 'data.json'

app.get('/', (req, res) => {
    res.end('Hello Muhaimenul Islam!');
});


app.get('/api/board', (req, res) => {
    fs.readFile(__dirname + '/' + 'data.json', 'utf8', (err, data) => {
        res.end(data);
    });
});


app.post('/api/task', (req, res) => {

    if (!req.body.content) {
        return res.status(422).json({
            message: 'Task can not be empty'
        });
    }

    //TODO:: store in mongo db

    fs.readFile(dbFilePath, 'utf8', (err, data) => {

        let item = {
            id: uuidv4(),
            content: req.body.content,
            created_at: Date.now()
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
            if (err) return res.status(422).json({
                message: 'Unable to create task. Try again.'
            });
        });

        res.status(200).json(item)

    });

});


app.post('/api/board', (req, res) => {
    //TODO:: update board on task status change

    let data = JSON.stringify(req.body.board)

    fs.writeFile(dbFilePath, data, 'utf8', function (err) {

        if (err) return res.status(422).json({
            message: 'Unable to update task. Try again.'
        });

        res.status(200).json(data)
    });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));