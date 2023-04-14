



const form_name = document.getElementById('nombre');
const form_price = document.getElementById('precio');
const form_stock = document.getElementById('stock');
const form_brand = document.getElementById('marca');
const form_category = document.getElementById('categoria');
const form_data = document.getElementById('form');
const form_short_description = document.getElementById('descripcion-corta');
const form_long_description = document.getElementById('descripcion-larga');
const form_button = document.getElementById('btn');


form_data.addEventListener('keyup', e=>{
    if(form_name.value !== '' && form_price.value !== '' && form_stock.value !== '' && form_short_description.value !== '' && form_long_description.value !== '' && validar() != ''){
        form_button.disabled= false
    }
  
})

function validar(){
    form_category.addEventListener('change', function(){
        form_button.disabled = false;
    })}

