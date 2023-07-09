const establishDBConnection = require('./db/connect')
const express = require('express')
const app = express();
const carRouter = require('./routes/car.js');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cars', carRouter);


establishDBConnection().then(() => {
    app.listen(3000, () => {
        console.log(`Listening on port ${PORT}`);
    });
})


