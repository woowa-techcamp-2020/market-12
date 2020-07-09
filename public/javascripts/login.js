document.getElementById("login_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = e.target.id.value;
  const password = e.target.password.value;

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ id, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "ok") window.location.href = "/";
      else {
        showErrorMessage("로그인 정보가 틀렸습니다.");
      }
    })
    .catch((e) => {
      throw e;
    });
});

function showErrorMessage(msg) {
  document
    .querySelectorAll("#login_form input")
    .forEach((elem) => elem.classList.add("input_alert"));
  document.getElementById("error_label").innerText = msg;
}
