document.addEventListener('DOMContentLoaded', () => {
//  setTimeout(()=>{
  let script = document.createElement('script');
  script.src = 'js/modules/index.js';
  document.body.appendChild(script);
  console.log('La página se cargó correctamente');
//  })
});









const getUrlFromId = id=> `templates/${id}.html`;


const main =  document.querySelector('.main')
const ajaxInit = (url, method = 'GET')=>{
  const xhr= new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  return xhr;
}; 



const urlNavbar = getUrlFromId('contact')

const xhr = ajaxInit(urlNavbar);





xhr.addEventListener('load', ev =>{
  if(ev.target.status === 200){
    const template = ev.target.responseText;
    main.innerHTML = template;
    prepareLinks();
  }
})



const prepareLinks = () =>{
  const urlHomePage = getUrlFromId('home');
  
  const xhr = ajaxInit(urlHomePage);

  xhr.addEventListener('load', ev=>{
    if(ev.target.status === 200){
    
      main.innerHTML = ev.target.responseText;
      
      
    }
  })

  // agregar script  correspondientes a cada archivo 
  let script = document.createElement('script');
  const AddScript = (name)=>{
    script.src = `js/modules/${name}.js`;
    document.body.appendChild(script);
  }

  const navLinks = document.querySelectorAll('.menu-navegacion a');
  navLinks.forEach(link =>{
    link.addEventListener('click', ev =>{
      ev.preventDefault();
      const id = ev.target.id;
      location.hash = id;

      const url = getUrlFromId(id);

      const xhr = ajaxInit(url);
      xhr.addEventListener('load', ev =>{
        let contentForMain =  ev.target.responseText;
        if (ev.target.status === 200) {
          if(url === 'index.html'){
            console.log('inicio')
          }
          if(url === 'templates/home.html'){
            AddScript('index');
          }
          contentForMain = ev.target.responseText;
          if(url === 'templates/about-us.html'){
            const secondScript = document.querySelectorAll('script')[2];
            secondScript.remove(secondScript);
            AddScript('about-us');
          }
          if(url === 'templates/contact.html'){
            const secondScript = document.querySelectorAll('script')[2];
            secondScript.remove(secondScript);
            AddScript('contact');
          }
      } else {
          contentForMain = '<h1>Error de carga</h1><p>Lamentablemente, se produjo un error al intentar recibir el contenido de esta página.</p>';
      }
      main.innerHTML = contentForMain;
      });
    });
  });
};

window.addEventListener('hashchange', ev=>{
  console.log('se cambio el hash')

   
  const id = location.hash.slice(1);  // Se toma desde el 2do caracter, eliminando el # inicial.

  const url = getUrlFromId(id);
  // console.log('url:', url);

  const xhr = ajaxInit(url);
  xhr.addEventListener('load', ev => {

      let contentForMainElement = '';
      
      if (ev.target.status === 200) {
          contentForMainElement = ev.target.responseText;
      } else {
          contentForMainElement = '<h1>Error de carga</h1><p>Lamentablemente, se produjo un error al intentar recibir el contenido de esta página.</p>';
      }

      main.innerHTML = contentForMainElement;

  });
})















const studentName='Cristian David Caro Herrera';
const projectName='Proyecto Integrador: Juguetería Cósmica';

document.title = `${document.title} - ${studentName} - ${projectName}`;

// CARRITO 
const buttonCart= document.querySelector('.btn-cart');
const cart= document.querySelector('.cart-modal-container')
let showHide= true;


/**
 * abrir modal agregando y quitando clases
 */
function openModal(){
    buttonCart.classList.toggle('held',showHide);
    cart.classList.toggle('display',showHide);        
    cart.classList.toggle('cart-modal-container',!showHide)
    showHide = !showHide;
}
buttonCart.addEventListener('click', openModal);

/**
 * permite cerrar modal correctamente con tecla scape
 */

function closeModal() {
    buttonCart.classList.remove('held');
    cart.classList.remove('display');
    cart.classList.add('cart-modal-container');
    showHide = true;
  }



// evento tecla scape 
window.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape') {
      console.warn('cerrar modal');
      closeModal();
    }
});


const closeButton = document.querySelector('.cierre');
closeButton.addEventListener('click', function(){
  closeModal()
}
);


// event click button of table
const table = document.querySelector(".cart-table");

table.addEventListener('click', (ev)=>{
    if (ev.target.classList.contains('button_delete')) {
        console.log('Botón de eliminar presionado');
        console.log(ev.target);
    }
});


// evento blur, cuando el boton pierde el foco 
// const body= document.querySelector('body')
// body.addEventListener("click",(ev)=>{
//         if(ev.target !== buttonCart && !cart.contains(ev.target)) {
//             console.warn('cerrar modal');
//             closeModal()
//           }
// });


// const xhrDos= ajaxInit('./templates/home.html');
// xhrDos.addEventListener('load', ev=>{
//   if(ev.target.status === 200){
//     const template = ev.target.responseText;
//    main.innerHTML = template;
//     prepareLinks()
//   }
//   else{
//    main.innerHTML = '<h1>Error en cargar</h1>'
//   }
// });



 
