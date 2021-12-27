var express = require('express');
var router = express.Router();

//기본 route
router.get('/', (req, res) => {
    res.render('main')
})

//Post form으로 받아보기 test
router.post('/login', (req, res) => {
    if (req.method == 'POST') {
        const info = req.body
        console.log(info)
        connection.query(
            `INSERT INTO signup (name, email) VALUES ('${info["name"]}' , '${info["email"]}')`, (err, result) => {
                if (err) throw err;
            }
        )
        res.redirect('/hello');
    }
})

module.exports = router;