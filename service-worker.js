const CACHE_NAME = "my-portal-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/register.html",
  "/categories.html",
  "/views/contact.html",
  "/views/courses.html",
  "/views/dashboard.html",
  "/views/home.html",
  "/dist/course_model.js",
  "/dist/courses.js",
  "/dist/data.js",
  "/dist/home.js",
  "/dist/login.js",
  "/dist/register.js",
  "/dist/router.js",
  "/dist/user_model.js"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).catch((err) => {
      console.error("[ServiceWorker] Caching failed:", err);
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((err) => {
      console.error("[ServiceWorker] Fetch failed:", err);
      return new Response("Offline and not cached", {
        status: 503,
        statusText: "Offline"
      });
    })
  );
});
