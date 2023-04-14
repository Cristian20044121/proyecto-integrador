
const studentName='Cristian David Caro Herrera';
const proyectName='Proyecto Integrador: Juguetería Cósmica';

document.title = `${document.title} - ${studentName} - ${proyectName}`;

// CARRITO 
const BotonCarrito = document.querySelector('.btn-cart');
const cart= document.querySelector('.cart-modal-container')
const modal = document.querySelector('.x')
let mostrarUOcultar = true;

BotonCarrito.addEventListener('click', function(){
    
    if(mostrarUOcultar){
        // console.log('mostrar carrito ')
        this.classList.add('held') 
        cart.classList.remove('cart-modal-container')
        cart.classList.add('display')
        mostrarUOcultar = !mostrarUOcultar;
        
    }else{
        // console.log('ocultar carrito')
        this.classList.remove('held')
        cart.classList.remove('display')
        cart.classList.add('cart-modal-container')
        mostrarUOcultar = !mostrarUOcultar;
        }
        
})



BotonCarrito.addEventListener('keydown', function(){
    // cart.classList.remove('display')
    // cart.classList.add('cart-modal-container'); = punto 5!!
    let scape= event.keyCode
    if(scape== 27) {
        console.warn("cerral modal")
        BotonCarrito.classList.remove('held')
        cart.classList.remove('display')
        cart.classList.add('cart-modal-container');
        if(mostrarUOcultar){
            BotonCarrito.classList.add('held') 
            cart.classList.remove('cart-modal-container')
            cart.classList.add('display')
            }
            console.log("la tecla presionada es",event.key)
    }
    
        
})

const BotonCierre = document.querySelector('.cierre');

BotonCierre.addEventListener('click', function(){

        if(mostrarUOcultar){
            this.classList.add('held') 
            cart.classList.remove('cart-modal-container')
            cart.classList.add('display')
            mostrarUOcultar = !mostrarUOcultar;}
        

            else{
                BotonCarrito.classList.remove('held')
                cart.classList.remove('display')
                cart.classList.add('cart-modal-container')
                mostrarUOcultar = !mostrarUOcultar;
                }
})



// event click button of table


const table = document.querySelector(".cart-table");

table.addEventListener('click', (ev)=>{
    if (ev.target.classList.contains('button_delete')) {
        console.log('Botón de eliminar presionado');
        console.log(ev.target)
    }
    
})

    
const body= document.querySelector('body')


BotonCarrito.addEventListener('blur',function(){
    body.addEventListener("click",(ev)=>{
        if(ev.target != BotonCarrito){
        cart.classList.remove('display')
        this.classList.remove('held')
        cart.classList.add('cart-modal-container')
        }
        else{
            cart.classList.add('display')
            this.classList.remove('held')
            cart.classList.remove('cart-modal-container')
           }
       })
       

      
})
