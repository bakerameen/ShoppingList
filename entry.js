// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express();

const route = require('./route/routes');

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/shoppinglist');

const dbPath = "mongodb+srv://baqer:iggy5R1y8urUhxts@cluster0-2wlh3.mongodb.net/test-Naseej-letter-competetion?retryWrites=true&w=majority";
mongoose
  .connect(dbPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log('error DB not Connected');
  });



// on connect
// mongoose.connection.on('connected', ()=> {
//     console.log('mongoose connected at port 27017');
// });

// // on not connect
// mongoose.connection.on('error', (err)=> {
// console.log(err);
// });


// middlewear

app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 7070;

app.get('/', (req, res)=> {
    res.send('Default Rate');
    });
    

app.listen(PORT, ()=> {
    console.log('server has been started at port'+ PORT);
});




