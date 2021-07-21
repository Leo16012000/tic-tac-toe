$(document).ready(function () {
  $(".modal-content").on("click", ".container button", function (e) {
    e.preventDefault();

    let usr = document.getElementById("usr").value;

    let psw = document.getElementById("psw").value;

    $.post("/login", { username: usr, password: psw }).done(function (isLogin) {
      if (isLogin == "wrong") {
        $(".note-error").html(
          "Tên đăng nhập hoặc mật khẩu bạn nhập không đúng."
        );
      } else location.replace("/room");
    });
  });

  $("#id01 .registerbtn").on("click", function () {
    location.replace("/signup");
  });
});
