const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('CRUD API for Whiteboard')
})

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://alfaro:${process.env.MONGO_PASS}@wbdv-sp21-01-juan-alfar.cqdt5.mongodb.net/whiteboard?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true});


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configure CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

require('./controllers/quizzes-controller')(app)
require('./controllers/questions-controller')(app)
require('./controllers/quiz-attempts-controller')(app)

app.listen(process.env.PORT)