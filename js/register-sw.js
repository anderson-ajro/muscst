// Chequeo si el browser puede usar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js')
        .then(reg => {
          console.log("Service worker esta listo!");
        });
  }
  else {
    console.log("Service worker no soportado.");
  }
  
  // Event Listener para Offline/ Online Status
  window.addEventListener('offline', event => {
    document.querySelector('body').classList.add('offline');
  });
  
  window.addEventListener('online', event => {
    document.querySelector('body').classList.remove('offline');
  });
  
  // A veces este evento falla, ojo!
  // Sirve para saber si el navegador esta offline, cuando entramos offline. 
  // Es decir, no se disparo los eventos de arriba aun, y necesito conocer el estado.
  // 
  
  if (!navigator.onLine) {
    document.querySelector('body').classList.add('offline');
  }