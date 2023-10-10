   
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text())
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'home';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
        
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }
    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
        
    }
    
   
    
}

const main = new Main();
main.start();


// agregar title 
const studentName='Cristian David Caro Herrera';
const projectName='Proyecto Integrador: Juguetería Cósmica';

document.title = `${document.title} - ${studentName} - ${projectName}`;

// CARRITO 
const buttonCart= document.querySelector('.btn-cart');
let showHide= true;

// menu hamburguesa 
document.getElementById('toggleMenu').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('hidden');
});


/**
 * abrir modal agregando y quitando clases
 */
function openModal(){
    buttonCart.classList.toggle('held',showHide);
    cart.classList.toggle('display',showHide);        
    showHide = !showHide;
}
buttonCart.addEventListener('click', openModal);

/**
 * permite cerrar modal correctamente con tecla scape
 */
// Función para abrir el modal
function openModal() {
    document.getElementById('myModal').classList.remove('hidden');
  }
  
  // Función para cerrar el modal
  function closedModal() {
    document.getElementById('myModal').classList.add('hidden');
    buttonCart.classList.remove('held');
  }
  
  // Asociar eventos a los botones
  document.getElementById('openModal').addEventListener('click', openModal);
  document.getElementById('closedModal').addEventListener('click', closedModal);

// evento tecla scape 
window.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape') {
      console.warn('cerrar modal');
      closedModal();
    }
});



// button de eliminar producto 

const table = document.querySelector(".cart-table");

table.addEventListener('click', (ev)=>{
    if (ev.target.classList.contains('button_delete')) {
        const row = ev.target.closest('tr');
        if (row) {
            row.remove();
            const alert = document.querySelector('.alert');
            alert.innerHTML = `
                
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-8" role="alert">
            <strong class="font-bold">Producto borrado exitosamente!</strong>
            <span class="block sm:inline ml-8">El producto ha sido eliminado de tu carrito.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-green-500 closed-button"  role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Cerrar</title><path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"/></svg>
            </span>
        </div>
            `
        alert.style.display = 'block';
        }
    }
    setTimeout(()=>{
        alert.style.display = 'none';
    }, 5000)
    // cerrar alerta 
    const closeButtonAlert = document.querySelector('.closed-button');
    const alert = document.querySelector('.alert');

        // Agregamos un evento de clic al botón
        closeButtonAlert.addEventListener('click', function() {
        // Ocultamos la alerta
        alert.style.display = 'none';
    });
});



/**
 *  desplazamiento de button (ver productos)
 */
const button = async () => {
    const b = document.getElementById('scrollButton');
    if (b) {
        b.addEventListener('click', function() {
            console.log('diste click');
            document.querySelector(this.getAttribute('data-target')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Llama a la función button después de 10 segundos (10000 milisegundos)
setTimeout(button, 1000);

// evento blur del modal 
    const modal = document.getElementById('myModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const closeModalButton = modal.querySelector('#closedModal');


    // Evento al hacer clic en el fondo oscuro
    modalOverlay.addEventListener('click', closedModal);

    // Evento al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', closedModal);
