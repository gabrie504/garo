// mobile-menu.js - Inicializa el menú móvil después de cargar el header
window.addEventListener('load', function() {
  // Usar setTimeout para asegurar que el header se haya cargado completamente
  setTimeout(function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      });
      
      console.log('Menú móvil inicializado correctamente');
    } else {
      console.error('No se encontraron los elementos del menú móvil');
    }
  }, 200);
});
