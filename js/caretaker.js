function showRegister() {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
}
function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
}

const stored = JSON.parse(localStorage.getItem("caretaker"));
if (stored) showLogin();
else showRegister();

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const pwd = document.getElementById("registerPwd").value;
  localStorage.setItem("caretaker", JSON.stringify({ name, email, password: pwd }));
  alert("Registered! Please log in.");
  showLogin();
});

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pwd = document.getElementById("loginPwd").value;
  const user = JSON.parse(localStorage.getItem("caretaker")) || {};
  if (user.email === email && user.password === pwd) {
    window.location.href = "caretaker-dashboard.html";
  } else {
    alert("Invalid credentials");
  }
});
