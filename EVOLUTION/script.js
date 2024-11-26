document.addEventListener('DOMContentLoaded', function () {
    // Obtén elementos y medidas
    var wrapper = document.getElementById('Cursos');
    var container = document.querySelector('#Cursos .course-container');
    var scrollLeft = document.getElementById('scroll-left');
    var scrollRight = document.getElementById('scroll-right');
    var courseWidth = 350; // Ancho de cada elemento del curso, ajusta según sea necesario
    var scrollDistance = 200; // Distancia de desplazamiento al hacer clic, ajusta según sea necesario
    var scrollDuration = 500; // Duración del desplazamiento, ajusta según sea necesario

    // Inicialmente oculta ambas flechas
    scrollLeft.style.display = 'none';
    scrollRight.style.display = 'none';

    // Añade eventos para mostrar/ocultar botones al pasar el cursor sobre la sección de cursos
    wrapper.addEventListener('mouseenter', function () {
        showScrollButtons();
    });

    wrapper.addEventListener('mouseleave', function () {
        hideScrollButtons();
    });

    // Añade un evento de desplazamiento hacia la izquierda
    scrollLeft.addEventListener('click', function () {
        smoothScroll(-scrollDistance, scrollDuration);
        showRightButton(); // Muestra el botón derecho después de hacer clic en el izquierdo
    });

    // Añade un evento de desplazamiento hacia la derecha
    scrollRight.addEventListener('click', function () {
        smoothScroll(scrollDistance, scrollDuration);
    });

    // Función para realizar un desplazamiento suave
    function smoothScroll(distance, duration) {
        var startTime = performance.now();
        var startScrollLeft = wrapper.scrollLeft;

        function scrollStep(timestamp) {
            var progress = Math.min((timestamp - startTime) / duration, 1);
            wrapper.scrollLeft = startScrollLeft + distance * easeInOutQuad(progress);

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                updateScrollButtons();
            }
        }

        function easeInOutQuad(t) {
            return t < 0.4 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(scrollStep);
    }

    // Funciones para mostrar/ocultar botones
    function showScrollButtons() {
        // Muestra el botón de desplazamiento hacia la izquierda
        scrollLeft.style.display = 'block';
        // Muestra el botón de desplazamiento hacia la derecha
        scrollRight.style.display = 'none';
    }

    function hideScrollButtons() {
        // Oculta ambas flechas al salir de la sección de Cursos
        scrollLeft.style.display = 'none';
        scrollRight.style.display = 'none';
    }

    // Muestra el botón derecho después de hacer clic en el izquierdo
    function showRightButton() {
        scrollRight.style.display = 'block';
    }

    // Función para actualizar la visibilidad de los botones de desplazamiento
    function updateScrollButtons() {
        // Verifica si hay desplazamiento hacia la derecha
        scrollRight.style.display = wrapper.scrollLeft < container.scrollWidth - wrapper.clientWidth ? 'block' : 'none';
        // Verifica si hay desplazamiento hacia la izquierda
        scrollLeft.style.display = wrapper.scrollLeft > 0 ? 'block' : 'none';
    }

    // Llama a la función inicialmente
    updateScrollButtons();
});
