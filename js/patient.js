document.addEventListener("DOMContentLoaded", () => {
  const current = JSON.parse(localStorage.getItem("currentPatient") || "{}");
  const meds = JSON.parse(localStorage.getItem("medicines") || "[]")
                .filter(m => m.patientEmail === current.email);
  const list = document.getElementById("reminderList");
  meds.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${m.medicineName}</h3>
      <p>${m.dosageTime} — ${m.instructions}</p>
      <img src="${m.image}" alt="${m.medicineName}">
    `;
    list.appendChild(card);
  });
});
