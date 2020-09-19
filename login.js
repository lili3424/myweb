/**
 * Created by Kay on 2016/3/8.
 */
function login() {

    var username = document.getElementById("username");
    var pass = document.getElementById("password");

    if (username.value == "") {

        alert("ユーザーネームを入力ください");

    } else if (pass.value == "") {

        alert("パスワードを入力ください");

    } else if (username.value == "admin" && pass.value == "123456") {

        window.location.href = "welcome.html";

    } else {

        alert("正しいネームとパスワードを入力ください")

    }
}