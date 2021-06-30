// Nombre del Cache
const cacheName = 'cache-version-1';


const precache = [

'/index.html',
'./conoceme.html',

'./css/bootstrap.min.css',
'./css/estilo1',
'./css/estilo.css',

  //js
'./js/app.js',
'./js/modal.js',
'./js/navbar.js',
'./js/register-sw.js',

  //img

  './img/icons/apple-touch-icon-48x48.png',
  './img/icons/apple-touch-icon-57x57.png',
  './img/icons/apple-touch-icon-60x60.png',
  './img/icons/apple-touch-icon-72x72.png',
  './img/icons/apple-touch-icon-76x76.png',
  './img/icons/apple-touch-icon-114x114.png',
  './img/icons/apple-touch-icon-120x120.png',
  './img/icons/apple-touch-icon-144x144.png',
  './img/icons/apple-touch-icon-152x152.png',
  './img/icons/apple-touch-icon-180x180.png',
  './img/icons/apple-touch-icon-192x192.png',
  './img/icons/apple-touch-icon-256x256.png',
  './img/icons/apple-touch-icon-384x384.png',
  './img/icons/apple-touch-icon-512x512.png',
  './img/icons/mstile-144x144.png',
  './img/icons/musicst.png',

  './img/01.jpg',
  './img/02.jpg',
  './img/03.jpg',
  
];


// Instalación
self.addEventListener('install', event => {


  self.skipWaiting();

  event.waitUntil(
      // Abro el cache, entonces agrego los archivos/recursos
      caches.open(cacheName).then(cache => {
        return cache.addAll(precache)
      })
  );
});


// Update - Es decir, si cambia una parte del SW (nombre), updatea el cache 
self.addEventListener('activate', event => {

  const cacheWhitelist = [cacheName];

  // Esto es lo que updatea cada una de las keys en el mapa del caché
  event.waitUntil(
      // Tomo las keys y las paso para revisar individualmente
      caches.keys().then(cacheNames => {
        // devuelvo Promesa
        return Promise.all(
            // Hago un map, para borrar key individualmente.
            // Recuerden que era el update, asi que precisa un delete.
            cacheNames.map(cacheName => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
        )
      })
  );
});


// Chequeamos la response
function shouldAcceptResponse(response) {
    return response.status !== 0 && !(response.status >= 400 && response.status < 500) || 
        response.type === 'opaque' || 
        response.type === 'opaqueredirect';
}


// Creamos el cache a partir de fetch de recursos
self.addEventListener('fetch', event => {
  // Chequeamos si existe en cache para el render de pagina
  // sino vamos a hacer cache del nuevo request
  event.respondWith(
      caches.open(cacheName).then(cache => { // Abrimos el cache actual
        return cache.match(event.request).then(response => {
          
          // Matcheo! - return response, se lo pasamos al promise abajo
          if (response) {
            return response;
          }

        // Tomamos el response cache de arriba
        return fetch(event.request).then(
          function(response) {

            // Chequeamos si recibimos una respuesta valida
            if(shouldAcceptResponse(response)) {
              return response;
            }

     
            var responseToCache = response.clone();

            // Aca lo que hace es guardar los recursos que vinieron del server
            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        )
        }).catch(error => {
          console.log('Fallo SW', error);
          return caches.match('offline.html');
        });
      })
  );
});
