
const form_name = document.getElementById('nombre');;
const form_email = document.getElementById('email');
const form_coments = document.getElementById('comentarios');
const form_button = document.getElementById('btn1');
const form_data = document.getElementById('form');


form_data.addEventListener('keyup', e=>{
    if(form_name.value !== '' && form_email.value !=='' && form_coments.value !== '') {
        form_button.disabled = false;
    }
    
})