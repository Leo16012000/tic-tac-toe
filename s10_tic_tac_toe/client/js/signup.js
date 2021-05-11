$(document).ready(function () {
  $(".modal-content").on("click", ".container button", function (e) {
    e.preventDefault();

    let usr = document.getElementById("usr").value;

    let psw = document.getElementById("psw").value;

    $.post("/signup", { username: usr, password: psw }).done(function (isRegister) {

      if (isRegister == "false") {
        $(".note-error").html(
          "Tên đăng nhập đã được tạo trước đó."
        );
      }else location.replace('/');

    });
  });

  $("#id01 .loginbtn").on("click", function () {
    location.replace("/login");
  });
});
