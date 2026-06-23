const express = require('express');
const app = express();
const PORT = 3000;

let data = ['Shikhar']

//Middleware
app.use(express.json());


//ROUTES OR Website ENDPOINTS
app.get('/', (req,res) => {
    console.log('User requested the home page website');
    res.send(`<body style="background: pink; color: blue;"> 
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
        <script>console.log('This is my script');</script>
    </body>`);
});

app.get('/dashboard', (req,res) => {
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>
    `);   
});


//API Endpoints 
app.get('/api/data', (req,res) => {
    res.send(data);
});

app.post('/api/data', (req,res) => {
    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201)
})

app.delete('/api/data/:name', (req,res) => {
    data.pop()
    console.log('We deleted the last entry');
    res.sendStatus(203);
});

//CREATE- POST  READ- GET   UPDATE- PUT     DELETE- DELETE
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));