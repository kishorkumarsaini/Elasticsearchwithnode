const elaticsearch = require('elasticsearch');


const elasticClient = new elaticsearch.Client({
    host: `http://192.168.0.101:9200`,
    log: 'trace'
});

exports.checkConn = function(req, res) {
    elasticClient.ping({
        requestTimeout: 3000
    }, function(error) {
        if (error) {
            res.status(500).json({
                status: false,
                msg: 'Elasticsearch cluster is down'
            })

        } else {
            console.log('connection started');
            res.status(200).json({
                status: true,
                msg: 'Success'
            })
        }
    });
}


//Create Index

exports.createIndex = (req, res) => {

    const indexName = req.params.indexName;
    elasticClient.indices.create({
            index: indexName
        })
        .then((resp) => {
            res.status(200).json({
                status: 'success',
                resp
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                msg: err
            })
        })

}

//check index exists

exports.checkIndex = (req, res) => {

    const indexName = req.params.indexName;
    elasticClient.indices.exists({
            index: indexName
        })
        .then((resp) => {
            res.status(200).json({
                status: 'success',
                resp
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'fail',
                msg: err
            })
        });
}


//add/update index
exports.addIndex = (req, res) => {

    elasticClient.index({
            index: 'blog',
            type: 'posts',
            body: req.body

        })
        .then((resp) => {
            res.status(200).json({
                status: 'success',
                resp
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 'fail',
                mesg: err
            })
        })

}

//update a document

exports.updateDocument = (req, res) => {

    elasticClient.update({
            index: 'post',
            id: req.params.id,
            body: {
                doc: req.body
            }
        })
        .then((doc) => {
            res.status(200).json({
                status: 'success',
                doc
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'fail',
                msg: err
            })
        })
}

// delete a document

exports.deleteDocument = (req, res) => {
    elasticClient.delete({
            index: 'blog',
            id: req.params.id
        })
        .then((doc) => {
            res.status(200).json({
                status: 'success',
                doc
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'fail',
                msg: err
            })
        })
}

//delete all document

exports.deleteAll = (req, res) => {
    elasticClient.indices.delete({
        index: '_all'
    }, (err, resp) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log('indeces is deleted');
            res.json({
                resp
            })
        }
    })

}

exports.searchIndex = (req, res) => {
    elasticClient.search({
            index: 'blog',
            type: 'posts',
            body: {
                query: {
                    match: {
                        "PostName": req.params.PostName
                    }
                }
            }
        })
        .then(doc => {
            res.status(200).json({
                status: 'success',
                doc
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'fail',
                msg: err
            })
        })
}

//get index

exports.getAll = (req, res) => {
    elasticClient.search({
            index: 'blog'
        })
        .then(resp => {
            res.status(200).json({
                blog: resp.hits.hits
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
}

exports.getIndex = (req, res) => {

    elasticClient.get({
            index: 'blog',
            id: req.params.id
        })
        .then((res) => {
            res.status(200).json({
                status: 'success',
                res
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'fail',
                msg: err
            })
        })
}