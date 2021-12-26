//express import
const express = require('express')

//app 객체 생성
const app = express()

//port 설정
const port = 8081

//ejs를 기본으로 설정 views 밑
app.set('view engine', 'ejs');
app.use(express.static('./'));

//json-parser 최신 이현준이 추천해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//mysql
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'no', //git 보안
    database: 'playground'
})

//기본 route
app.get('/', (req, res) => {
    res.render('main')
})

//rank
app.get('/rank', (req, res)=> {
    var settings = {
        "url": "https://github.com/users/min050410/contributions",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Cookie": "_gh_sess=vRKJ9lCpQEw3CxsSfJpfgaqP8JQuekFA8SOxi71Z3wzVCiIbE2jX1I5mH1zBG%2FS1WqPr2%2BJXUnxwsKc8kdKiE3K6O6En%2BK6u%2BeGFcaegUvUZbxOqnG3Ee7Hp7bVjhzRi3qpo4GQFnJv5YLqyZIUfpLl6B0db9%2BV0FsiW5TVPVHIvCQC%2FMYEgfq90%2BopEflAOm5zbUFS8z2XBtHvgxjS4G2lSaL1a2g8OXmzEk3u%2FZR6PxIjHlA8sSepgsQRUlICS0M37s2jDeru9Dd43s%2BESBQ%3D%3D--nkkfPwt4jZ3e7COi--flzG1LjS4IIx2Q4tezLPtg%3D%3D; _octo=GH1.1.1933873358.1640512358; logged_in=no"
        },
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
    });
})

//Post form으로 받아보기 test
app.post('/login', (req, res) => {
    if (req.method == 'POST') {
        const info = req.body
        console.log(info)
        //mysql에 연결
        // connection.connect();
        connection.query(
            `INSERT INTO signup (name, email) VALUES ('${info["name"]}' , '${info["email"]}')`, (err, result) => {
                if (err) throw err;
            }
        )
        //mysql 연결 끊기
        // connection.end();
        res.redirect('/hello');

    }
})



//port listen -> 8081
app.listen(port, () => {
    //console.log는 terminal 에서 나옴
    console.log(`Example app listenling 거시기 ${port}`)
})



