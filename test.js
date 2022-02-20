var mysql = require('mysql');
var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '366366',
        database: 'sumaho'
    })
    //将相关数据写入
var query1 = "select * from students"
connection.query(query1, function(err, result) {
    if (err) throw err;
    console.log("!!!", result)
    if (result.length == 0) {
        res.send("用户名或密码错误")
    } else { res.send("<h2>登録できました！<h2>") }
})
``