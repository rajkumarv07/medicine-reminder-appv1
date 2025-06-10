self.addEventListener("install", event => {
  console.log("✅ Service Worker installed");
  self.skipWaiting(); // Instantly activate
});

self.addEventListener("activate", event => {
  console.log("✅ Service Worker activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
