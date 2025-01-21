/* eslint-disable @typescript-eslint/no-unused-vars */

self.addEventListener('install', (event) => {
  console.log('Service Worker. install');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker. activate');
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker. fetching:', event.request.url);
  event.respondWith(fetch(event.request));
});