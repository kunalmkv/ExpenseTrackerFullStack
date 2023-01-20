const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
var cors = require('cors');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/admin', adminRoutes);


sequelize.sync().then(result => {
    app.listen(3000);
})
    .catch(err => {
        console.log(err)
    })
