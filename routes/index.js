var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
let $;

const getJandi = async (username) => {
    try {
        return await axios.get(`https://ghchart.rshah.org/${username}`);
    } catch(error){
        console.error(error);
    }
}

getJandi("min050410")
.then(html => {
    $ = cheerio.load(html.data);  
    log($('html').html())
})

//기본 route
router.get('/', (req, res) => {
    res.send($('html').html());
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