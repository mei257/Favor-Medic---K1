document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || userData.email !== email || userData.password !== password) {
    alert("Email atau password salah!");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInEmail", email);

  alert("Berhasil masuk!");
  window.location.href = "profile.html";
});
