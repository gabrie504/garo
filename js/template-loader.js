// js/template-loader.js
document.addEventListener('DOMContentLoaded', function() {
  // Buscar todos los elementos con data-include
  const includes = document.querySelectorAll('[data-include]');
  
  let promises = [];
  
  includes.forEach(element => {
    const file = element.getAttribute('data-include');
    
    const promise = fetch(file)
      .then(response => response.text())
      .then(data => {
        element.innerHTML = data;
        element.removeAttribute('data-include');
        
        // Si es el header, activar el enlace correspondiente
        if (file.includes('header.html')) {
          console.log('Header cargado');
          setActiveNavLink();
        }
        if (file.includes('footer.html')) {
          console.log('footer cargado');
          setActiveNavLink();
        }
      })
      .catch(error => console.error('Error cargando', file, error));
    
    promises.push(promise);
  });

  // Esperar a que todos los includes se carguen antes de inicializar el menú
  Promise.all(promises).then(() => {
    console.log('Todos los includes cargados, inicializando menú móvil');
    initMobileMenu();
  });
});
function setActiveNavLink() {
  // Obtener la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Seleccionar todos los enlaces del nav
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    // Si el href coincide con la página actual
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('text-primary');
      link.classList.remove('hover:text-primary');
    } else {
      link.classList.remove('text-primary');
      if (!link.classList.contains('hover:text-primary')) {
        link.classList.add('hover:text-primary');
      }
    }
  });
}

function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  console.log('initMobileMenu - Elementos encontrados:', {
    button: !!mobileMenuButton,
    menu: !!mobileMenu,
    menuIcon: !!menuIcon,
    closeIcon: !!closeIcon
  });

  if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
    
    // Función toggle
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Click en botón móvil');
      
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
      console.log('Menú toggled, hidden:', mobileMenu.classList.contains('hidden'));
    }
    
    // Agregar el listener al botón
    mobileMenuButton.addEventListener('click', toggleMenu);
    
    // También agregar listeners a los SVG para asegurar que funcione
    menuIcon.addEventListener('click', toggleMenu);
    closeIcon.addEventListener('click', toggleMenu);
    
    console.log('Event listeners agregados correctamente');
  } else {
    console.error('Faltan elementos del menú móvil:', {
      button: mobileMenuButton,
      menu: mobileMenu,
      menuIcon: menuIcon,
      closeIcon: closeIcon
    });
  }
}
