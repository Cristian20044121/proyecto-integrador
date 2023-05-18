// validar formulario 
const formName = document.getElementById('nombre');
const formPrice = document.getElementById('precio');
const formStock = document.getElementById('stock');
const formBrand = document.getElementById('marca');
const formCategory = document.getElementById('categoria');
const formData = document.getElementById('form');
const formShortDescription = document.getElementById('descripcion-corta');
const formLongDescription = document.getElementById('descripcion-larga');
const formButton = document.getElementById('btn');


form_data.addEventListener('keyup', e=>{
    if(formName.value !== '' && formPrice.value !== '' && formStock.value !== '' && formShortDescription.value !== '' && formLongDescription.value !== '' && validar() != ''){
        formButton.disabled= false
    }
});

function validar(){
    formCategory.addEventListener('change', function(){
        formButton.disabled = false;
    });
};

