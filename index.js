const express = require('express')
const app = express();
const carRouter = require('./routes/car.js');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cars', carRouter)


app.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});

