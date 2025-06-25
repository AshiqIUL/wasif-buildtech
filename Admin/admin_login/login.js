// Admin/admin-login/login.js
const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  console.log("🔐 Attempting login with:", { username, password });

  try {
    const response = await fetch("http://localhost:5000/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("📬 Server response:", data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/Admin/admin-dashboard/dashboard.html"; 
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    alert("Something went wrong. Please try again.");
  }
});
