
const accordionTitles = document.querySelectorAll('.accordion-title');


for(let i = 0; i < accordionTitles.length; i++) {
    accordionTitles[i].addEventListener('click', function(){
        this.classList.toggle('accordion-title--open');
    })
}

console.log(accordionTitles);