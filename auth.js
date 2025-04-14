document.addEventListener("DOMContentLoaded", function () {
  const auth = firebase.auth();

  // ✅ Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("✅ Login success");
          window.location.href = "dashboard.html";
        })
        .catch(err => {
          console.error("Login error:", err.message);
          const errorBox = document.getElementById("formError");
          if (errorBox) errorBox.textContent = err.message;
        });
    });
  }

  // ✅ Register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("✅ Registered successfully");
          window.location.href = "dashboard.html";
        })
        .catch(err => {
          console.error("Register error:", err.message);
          const errorBox = document.getElementById("formError");
          if (errorBox) errorBox.textContent = err.message;
        });
    });
  }

  // ✅ Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      auth.signOut().then(() => {
        console.log("✅ Logged out");
        window.location.href = "login.html";
      });
    });
  }

  // ✅ Protect dashboard
  if (window.location.pathname.includes("dashboard.html")) {
    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "login.html";
      }
    });
  }
});
