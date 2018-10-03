/*console.log('Service Worker: resgistered');*/

let staticCacheName = "restaurants-static-v3";
let urlsToCache = [
  "/",
  "/index.html",  
  "/restaurant.html",
  "/css/styles.css",
  "/data/restaurants.json",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/sw-reg.js",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(urlsToCache))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== staticCacheName) {
        console.log("[ServiceWorker] removing cached files from ", cache);
        return caches.delete(cache);
      }
    })))
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

       
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

          
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});