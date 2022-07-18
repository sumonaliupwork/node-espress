const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = 8000;

const users = [
    { id: 0, name: 'Md. Ahsan Ullah', email: 'ahsan@gmail.com' },
    { id: 1, name: 'Md. Sujon Ali', email: 'sujon@gmail.com' },
    { id: 2, name: 'Mst. Sadia Afrin', email: 'sadiafrin@gmail.com' }
]

app.get('/users', (req, res) => {
    const result = req.query.search;
    if (result) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(result));
        res.send(searchResult);
    } else {
        res.send(users);
    }

});

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('data', req.body);
    res.send(JSON.stringify(newUser));
    // res.json(newUser);
})

app.get('/users/:usersId', (req, res) => {
    const id = req.params.usersId;
    const user = users[id];
    res.send(user);
})

app.listen(port, () => {
    console.log('listening', port);
});