document.addEventListener("DOMContentLoaded", event => {
  /**
   *     Service Worker registration
   */
  if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register("js/sw.js")
      .then(registration => console.log("Service Worker registered", registration))
      .catch(e => console.log("Registration failed :(", e));
  }
});
