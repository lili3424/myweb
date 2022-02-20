http.createServer(function(req, res) {
    if (req.url == '/favicon.ico') {
        return;
    };
    var pathname = url.parse(req.url).pathname;
    var body = ''; //定义一个放post数据的变量

    req.on('data', function(chunk) { //接受post参数并赋值给body
        body = '';
        body += chunk;
        body = querystring.parse(body);
    });

    fs.readFile(pathname.substring(1) + '.html', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('404页面不存在');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=urf-8'
            });

            if (body) { //如果body存在 说明进行了post请求
                switch (pathname) { //判断登录还是注册
                    case '/login': //执行登录事件   并传入对应参数
                        query.emit('login', body.username, body.password, connection);
                        break;
                    case '/regsiter': //执行注册事件   并传入对应参数
                        query.emit('regsiter', body.username, body.password, connection);
                        break;
                }
            };

            res.write(data);
        };
        res.end();
    })
}).listen(3000);

var Event = require('events').EventEmitter; //引入事件模块
var query = new Event(); //创建事件对象

//绑定login事件  传入 username password  链接数据库对象
query.on('login', function(username, password, connection) {
    //编写sql查询语句;
    var find = 'SELECT * FROM userinfo WHERE UserName = ' + username;
    //执行sql语句
    connection.query(find, function(err, result) {
        if (err) { //链接失败 直接return;
            console.log('[错误]' + err);
            return;
        };

        if (result.length) { //如果查到了数据
            console.log('------------start----------------');
            var string = JSON.stringify(result);
            var json = JSON.parse(string)[0];
            console.log(string)
            if (json.UserPass == password) {
                console.log('密码校验正确');
            } else {
                console.log('密码校验错误');
            }
            console.log('--------------end-----------------');
        } else {
            console.log('账号不存在')
        }
    })
})