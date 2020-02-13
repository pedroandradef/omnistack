const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb://pedro:pedro@mybd-shard-00-00-msw2k.gcp.mongodb.net:27017,mybd-shard-00-01-msw2k.gcp.mongodb.net:27017,mybd-shard-00-02-msw2k.gcp.mongodb.net:27017/week10?ssl=true&replicaSet=myBD-shard-0&authSource=admin&retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(express.json());
app.use(routes);
app.listen(3000);