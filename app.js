/** Animacion boton de menu*/
var botonMenu = document.getElementById('menu-boton');
var mediaQuery = window.matchMedia('(min-width: 500px)');

if (mediaQuery.matches) {
  // Aquí puedes aplicar las clases o lógica que quieras para el menú móvil
  botonMenu.addEventListener('mouseover', function() {
    let menu = document.getElementById('menu-icono');
    menu.classList.add('menu-icono-activo');
  });
  
  botonMenu.addEventListener('mouseout', function() {
    let menu = document.getElementById('menu-icono');
    menu.classList.remove('menu-icono-activo');
  });


} else {
  // Si el ancho de la pantalla es mayor a 500px
};


/** Toogle menu*/
var botonesMenuoffcanvas = document.querySelectorAll('[id^="menu-boton"]'); 
var menu = document.getElementById('offcanvas');

botonesMenuoffcanvas.forEach(function(boton) {
  boton.addEventListener('click', function() {
    menu.classList.toggle('menu-offcanvas-activo');

    // Bloquear/desbloquear el scroll
    if (menu.classList.contains('menu-offcanvas-activo')) {
      document.body.style.overflow = 'hidden'; // Bloquear scroll
    } else {
      document.body.style.overflow = ''; // Desbloquear scroll
    }

    // Animación del icono (ajusta si tienes más iconos o diferente lógica)
    let barra = document.getElementById('menu-icono');
    barra.classList.toggle('menu-icono-animacion-activo');
  });
});

/**ACORDION */
document.addEventListener('DOMContentLoaded', () => {
  const togglers = document.querySelectorAll('[data-toggle]');

  togglers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
          const selector = e.currentTarget.dataset.toggle;
          const block = document.querySelector(selector);

          // Si el bloque está colapsado
          if (!e.currentTarget.classList.contains('active')) {
              // Colapsar otros bloques
              document.querySelectorAll('.accordion__content').forEach((content) => {
                  content.style.maxHeight = '';
                  content.previousElementSibling.classList.remove('active'); // Elimina la clase active del header
              });
              
              // Expandir el bloque actual
              block.style.maxHeight = block.scrollHeight + 'px';
          } else {
              // Colapsar el bloque actual
              block.style.maxHeight = '';
          }

          // Alternar la clase active en el encabezado
          e.currentTarget.classList.toggle('active');
      });
  });
});


/** Flecha */
let rotation = 0; // Establece la rotación inicial en 45 grados (puedes ajustar este valor)
let scrollThreshold = 800; // Cambia este valor para ajustar el desplazamiento inicial
let maxRotation = 90; // La máxima rotación en grados

// Aplica la rotación inicial a la flecha
document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.querySelector('.sobre-mi-flecha');
    arrow.style.transform = `rotate(${rotation}deg)`; // Aplica la rotación inicial
});

document.addEventListener('scroll', () => {
    const arrow = document.querySelector('.sobre-mi-flecha');
    
    // Obtener la posición de desplazamiento actual
    const scrollY = window.scrollY;

    // Calcular el porcentaje de desplazamiento
    const percentScrolled = Math.min(scrollY / scrollThreshold, 1); // Limita a un máximo de 1
    rotation = 45 + percentScrolled * (maxRotation - 0); // Rango de rotación de 45 a 90

    arrow.style.transform = `rotate(${rotation}deg)`; // Aplica la rotación
});



// Función para manejar la activación de la clase "active"
const activateAnimation = (entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Dejar de observar el elemento una vez activado
      }
  });
};

// Crear un nuevo Intersection Observer
const observer = new IntersectionObserver(activateAnimation);

// Observar los elementos que tienen la clase fade-in y slide-in
document.querySelectorAll('.fade-in, .slide-in, .slide-left, .slide-rigth').forEach(element => {
  observer.observe(element);
});







/** marquee */
function Marquee(selector, speed, direction) {
  const parentSelectors = document.querySelectorAll(selector);

  parentSelectors.forEach(parentSelector => {
      const originalContent = parentSelector.innerHTML; // Guardamos el contenido original
      let i = 0;

      // Duplicamos el contenido dos veces para el efecto marquee
      parentSelector.insertAdjacentHTML('beforeend', originalContent);
      parentSelector.insertAdjacentHTML('beforeend', originalContent);

      const firstElement = parentSelector.children[0]; // Primer bloque a mover
      const totalWidth = firstElement.scrollWidth; // Ancho total del contenido

      // Inicializamos la posición del primer elemento
      if (direction === 'left') {
          firstElement.style.marginLeft = '0px'; // Comenzar desde 0
      } else if (direction === 'right') {
          firstElement.style.marginLeft = `-${totalWidth}px`; // Comenzar desde el lado izquierdo
      }

      // Función de animación
      function animate() {
          // Cambia la velocidad si la pantalla es menor a 500px
          const adjustedSpeed = window.innerWidth < 500 ? speed / 7
          
          : speed;

          if (direction === 'left') {
              firstElement.style.marginLeft = `-${i}px`;
              i += adjustedSpeed;

              // Reiniciar la posición cuando el contenido se ha movido completamente
              if (i >= totalWidth) {
                  i = 0; // Reiniciar para un bucle continuo
              }
          } else if (direction === 'right') {
              // Para el marquee a la derecha, movemos el primer elemento
              firstElement.style.marginLeft = `${-totalWidth + i}px`;
              i += adjustedSpeed;

              // Reiniciar la posición cuando el contenido se ha movido completamente
              if (i >= totalWidth) {
                  i = 0; // Reiniciar para un bucle continuo
              }
          }

          requestAnimationFrame(animate); // Llama a la función en el siguiente frame
      }

      animate(); // Iniciar la animación
  });
}

// Llamamos a las funciones después de que la ventana haya terminado de cargar
window.addEventListener('load', function() {
  Marquee('.marquee-left', 4, 'left');  // Ajusta la velocidad aquí
  Marquee('.marquee-right', 4, 'right'); // Ajusta la velocidad aquí
});





/**BOLITA DE SCROLL */
function myFunction() {
  // Obtener la posición de desplazamiento
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  // Obtener la altura total del documento menos la altura de la ventana
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // Calcular la posición de la bolita en porcentaje
  var scrolled = (winScroll / height) * 100;

  // Calcular la altura de la barra
  var barHeight = document.querySelector('.scroll-bar').offsetHeight;
  var ballHeight = document.getElementById("myBall").offsetHeight;

  // Calcular la posición de la bolita
  var ballPosition = (barHeight - ballHeight) * (scrolled / 100);

  // Asignar la posición a la bolita
  document.getElementById("myBall").style.top = ballPosition + "px";
}

// Añadir el evento de scroll
window.addEventListener('scroll', myFunction);





/** Formulario de contacto*/        
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

  // Obtén los valores del formulario
  var nombre = document.querySelector('input[name="nombre"]').value;
  var telefono = document.querySelector('input[name="telefono"]').value;
  var asunto = document.querySelector('input[name="asunto"]').value;
  var correo = document.querySelector('input[name="correo"]').value;
  var mensaje = document.querySelector('textarea[name="mensaje"]').value;

  // Datos a enviar a Brevo
  var data = {
      sender: { email: "servicios@mestizodiseno.com.ar" }, // Tu correo verificado
      to: [{ email: "hola@mestizodiseno.com.ar" }], // El correo al que llegará el mensaje
      replyTo: { email: correo }, // Correo del usuario para las respuestas
      subject: `${asunto}`,
      htmlContent: `<p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Teléfono:</strong> ${telefono}</p>
                    <p><strong>Correo:</strong> ${correo}</p>
                    <p><strong>Mensaje:</strong><br>${mensaje}</p>`
  };

  // Realizar el envío usando Fetch y la API de Brevo
  fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "api-key": "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" // Reemplaza con tu clave API de Brevo
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      // Mostrar un mensaje de éxito
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '<p>Correo enviado exitosamente.</p>';
      resultado.classList.add('show');
  })
  .catch(error => {
      // Mostrar un mensaje de error
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '<p>Error al enviar el correo.</p>';
      resultado.classList.add('show');
      console.error('Error:', error);
  });
});




/**fondo stiky */

document.addEventListener('DOMContentLoaded', function() {
  const cabecera = document.querySelector('.cabecera');

  window.addEventListener('scroll', function() {
      if (window.scrollY >= 50) {
          cabecera.classList.add('scroll-activo');
      } else {
          cabecera.classList.remove('scroll-activo');
      }
  });
});
