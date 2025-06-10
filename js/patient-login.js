document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("emailSelect");
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");

  // Populate dropdown
  patients.forEach(p => {
    const o = document.createElement("option");
    o.value = p.email;
    o.textContent = `${p.name} (${p.email})`;
    sel.appendChild(o);
  });

  document.getElementById("patientLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedEmail = sel.value;
    const enteredPassword = document.getElementById("patientPwd").value;

    const patient = patients.find(p => p.email === selectedEmail && p.password === enteredPassword);

    if (patient) {
      localStorage.setItem("currentPatient", JSON.stringify(patient));
      window.location.href = "patient.html";
    } else {
      alert("Invalid credentials");
    }
  });
});
