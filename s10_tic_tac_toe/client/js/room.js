$(document).ready(function () {
  $(".content").on("click", ".virtual-keyboard li", function () {
    $("#idRoom").focus();
    $("#idRoom").val($("#idRoom").val() + Number($(this).html()));
  });

  $("#idRoom").keypress(function (event) {
    event.preventDefault();
    return false;
  });

  $(".content").on("change", "[type=text]", function (e) {
    $(e.target).val(
      $(e.target)
        .val()
        .replace(/[^\d\.]/g, "")
    );
  });

  $(".content").on("focus", "[type=text]", function () {
    $(".reicon").css({ display: "block" });
  });

  $(".content").on("click", ".reicon", function () {
    $("#idRoom").val("");
  });

  $(".content").on("click", "#goRoom", function () {
    window.location.href = `/play?room=${$("#idRoom").val()}`;
  });
});
