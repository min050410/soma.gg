//express import
const express = require('express')
//app 객체 생성
const app = express()
//port 설정
const port = 8081
//ejs를 기본으로 설정 views 밑
app.set('view engine', 'ejs');
app.use(express.static('./'));

//json-parser최신이현준이추천해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//mysql
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '비밀번호',
    database : 'playground'
})
//mysql에 연결
connection.connect();

//query
connection.query('SELECT * FROM select_test', (error, results, fields) => {
    if(error) throw error;
    console.log('The solution is: ', results);
});
//mysql 연결 끊기
connection.end();

//기본 route
app.get('/', (req, res) => {
    res.send('hello world')
})

//test 기본 get 테스트
app.get('/test', (req, res) => {
    res.status(200).json(
        {
            "message": "test"
        }
    )
})

//post_test Postman을 이용한 test
app.post('/post_test', (req, res) => {
    const user_message = req.body.message;
    console.log(user_message)
    res.status(200).json(
        {
            "message": user_message
        }
    )
})

//flask rendertemplate ㄷㄷ
app.get('/hello', (req, res) => {
    res.render('hello', { name: req.query.nameQuery })
})

//Post form으로 받아보기 test
app.post('/login', (req, res) => {
    if (req.method == 'POST') {
        const info = req.body
        console.log(info)
        res.status(200).json(info)
    }
})
 
//port listen -> 8081
app.listen(port, () => {
    //console.log는 terminal 에서 나옴
    console.log(`Example app listenling 거시기 ${port}`)
})


