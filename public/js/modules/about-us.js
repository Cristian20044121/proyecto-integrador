
console.warn('🆗: Módulo PageNosotros cargado.');

// accordion 
setTimeout(()=>{
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach((titles)=>{
        titles.addEventListener('click',(ev)=>{
                ev.target.classList.toggle('accordion-title--open');
        })
    });
},100);
