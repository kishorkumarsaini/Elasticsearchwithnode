const express = require('express');
const bodyParser = require('body-parser');
const elasticController = require('./controller/elasticController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/checkConnection', elasticController.checkConn);
app.post('/createIndex/:IndexName', elasticController.checkIndex);
app.get('/checkIndex', elasticController.checkIndex);

app.post('/addIndex', elasticController.addIndex);

app.patch('/updateIndex', elasticController.updateDocument);

app.delete('/deleteIndex', elasticController.deleteDocument);
//delete all document

app.delete('/deleteAll', elasticController.deleteAll);

app.get('/searchIndex', elasticController.searchIndex);

//get index
app.get('/getIndex', elasticController.getIndex);

app.get('/getAll', elasticController.getAll);


const port = 7000;
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});