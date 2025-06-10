// ✅ Resize and convert image to base64
function resizeImage(file, maxWidth = 300, maxHeight = 300, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // JPEG + 70% quality
      callback(resizedBase64);
    };
  };
}

// 🟢 Populate dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
  updatePatientDropdown();
});

// 🧑‍⚕️ Add Patient
document.getElementById("addPatientForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("patientName").value.trim();
  const email = document.getElementById("patientEmail").value.trim();
  const password = document.getElementById("patientPassword").value.trim();

  const patients = JSON.parse(localStorage.getItem("patients") || "[]");

  if (patients.some(p => p.email === email)) {
    alert("Patient already exists.");
    return;
  }

  patients.push({ name, email, password });
  localStorage.setItem("patients", JSON.stringify(patients));
  alert("Patient added successfully!");
  updatePatientDropdown();
  this.reset();
});

// 💊 Add Medicine (with compressed image)
document.getElementById("addMedicineForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const file = document.getElementById("medicineImage").files[0];

  resizeImage(file, 300, 300, function (resizedImageBase64) {
    const meds = JSON.parse(localStorage.getItem("medicines") || "[]");
    meds.push({
      patientEmail: document.getElementById("patientSelect").value,
      medicineName: document.getElementById("medicineName").value.trim(),
      dosageTime: document.getElementById("dosageTime").value,
      instructions: document.getElementById("instructions").value.trim(),
      image: resizedImageBase64
    });
    localStorage.setItem("medicines", JSON.stringify(meds));
    alert("Medicine added!");
    document.getElementById("addMedicineForm").reset();
  });
});

// 🔄 Update dropdown
function updatePatientDropdown() {
  const sel = document.getElementById("patientSelect");
  if (!sel) return;

  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  sel.innerHTML = '<option value="" disabled selected>Select Patient</option>';

  patients.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.email;
    opt.textContent = `${p.name} (${p.email})`;
    sel.appendChild(opt);
  });
}
