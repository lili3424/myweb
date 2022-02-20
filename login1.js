/**
 * Created by Kay on 2020/9/16.
 */
function login() {

    var username = document.getElementById("user_id");
    var pass = document.getElementById("user_pw");

    if (username.value == "") {

        alert("ユーザーネームを入力ください");

    } else if (pass.value == "") {

        alert("パスワードを入力ください");

    } else if (username.value == "admin" && pass.value == "123456") {

        window.location.href = "home.html";

    } else {

        alert("正しいネームとパスワードを入力ください")

    }
}