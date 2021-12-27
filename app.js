//express import
const express = require('express')
const app = express()

//port 설정
const port = 8000

//ejs를 기본으로 설정 views directory 밑
app.set('view engine', 'ejs');
app.use(express.static('./'));

//json-parser 최신 이현준이 추천해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

//mysql
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'no', //git 보안
    database: 'playground'
})

//username 을 받고 github contribution수를 가져오는 함수
const getHTML = async (username) => {
    try {
        return await axios.get(`https://github.com/users/${username}/contributions`);
    } catch (error) {
        console.error(error);
    }
}

getHTML("min050410")
    .then(html => {
        const $ = cheerio.load(html.data);
        const $contributions = $("h2")
        var contributions = $contributions.html()
        var regex = /[^0-9]/g;
        var result = contributions.replace(regex, "");
        log(result);
    })

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, () => {
    log(`Example app listenling 거시기 ${port}`)
})



