if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.error("❌ SW registration failed", err));
}

// ✅ 1. Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.error("❌ SW registration failed", err));
}

// ✅ 2. Ask for permission
Notification.requestPermission().then(permission => {
  if (permission !== "granted") {
    console.warn("🔕 Notification permission not granted");
  }
});

// ✅ 3. Reminder logic
function checkReminders() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
  console.log("⏰ Checking time:", currentTime);

  const patient = JSON.parse(localStorage.getItem("currentPatient") || "{}");
  const meds = JSON.parse(localStorage.getItem("medicines") || "[]");

  meds
    .filter(m => m.patientEmail === patient.email && m.dosageTime === currentTime)
    .forEach(m => {
      console.log("🔔 Triggering reminder for:", m.medicineName);
      new Notification("💊 Time to take your medicine!", {
        body: `${m.medicineName} — ${m.instructions}`,
        icon: "https://cdn-icons-png.flaticon.com/512/6104/6104330.png"
      });
    });
}

// ✅ 4. Run on load & repeat every minute
checkReminders();                // check right now
setInterval(checkReminders, 60000); // check every minute
