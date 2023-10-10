import productController from '../controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');


    const formName = document.getElementById('nombre');
    const formPrice = document.getElementById('precio');
    const formStock = document.getElementById('stock');
    const formBrand = document.getElementById('marca');
    const formCategory = document.getElementById('categoria');
    const formData = document.getElementById('form');
    const formShortDescription = document.getElementById('descripcion-corta');
    const formButton = document.getElementById('btn');
    const form = document.getElementById('form');
//     // console.log(form);
// setTimeout(()=>{
  formData.addEventListener('change', () => {
    if (
      formName.value !== '' &&
      formPrice.value !== '' &&
      formStock.value !== '' &&
      formBrand.value !== '' &&
      formShortDescription.value !== '' 
    ) {
      formButton.disabled = false;
    }
  });
  
  formCategory.addEventListener('change', () => {
    formButton.disabled = false;
  });
//   },100)


class PageAlta {

    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        PageAlta.loadTable();
        return deletedProduct;
    }


    static async updateProduct(e) {
      try {
          // Obtener los elementos del formulario
          const formId = document.getElementById('productIdEdit');
          const formImage = document.getElementById('imageEdit');
          const formName = document.getElementById('nombreEdit');
          const formPrice = document.getElementById('precioEdit');
          const formStock = document.getElementById('stockEdit');
          const formBrand = document.getElementById('marcaEdit');
          const formCategory = document.getElementById('categoriaEdit');
          const formLongDescription = document.getElementById('descripcion-corta-Edit');
        
          const selectedText = formCategory.options[formCategory.selectedIndex].text;

          // Obtener el ID del producto
          const id = formId.value;
  
          // Obtener los valores actualizados del formulario
          const updatedProducts = {
              _id: id, // Asignar el ID obtenido del formulario
              name: formName.value,
              price: formPrice.value,
              stock: formStock.value,
              brand: formBrand.value,
              category: selectedText,
              longDescription: formLongDescription.value,
              mainPhoto: formImage.value
          };
  
          const response = await productController.updateProduct(id, updatedProducts);
  
          if (response.ok) {
              alert('Producto actualizado correctamente');
              form.reset();
              PageAlta.loadTable();
              return response;
          } else {
              console.log('Error al actualizar el producto');
          }
      } catch (error) {
          console.error(error);
      }
  }
  
  

        // console.log(product)
        // const CreatedProduct = await productController.saveProduct(product)
        // console.log(CreatedProduct);
        // PageCreate.loadTable();
        // PageCreate.form.reset();
        // return CreatedProduct;
    

    static getProductFromRow(row) {
        const rowCells = row.children;
        const product = {};
        for (const cell of rowCells) {
            if (cell.dataset.productProperty) {
                product[cell.dataset.productProperty] = cell.innerHTML;
            }
        }
        return product;
    }

    static async completeForm(e) {
      const row = e.target.closest('tr');
      const productToEdit = PageAlta.getProductFromRow(row);
      const id = document.getElementById('productIdEdit')
      const formImage = document.getElementById('imageEdit');
      const formName = document.getElementById('nombreEdit');
      const formPrice = document.getElementById('precioEdit');
      const formStock = document.getElementById('stockEdit');
      const formBrand = document.getElementById('marcaEdit');
      const formCategory = document.getElementById('categoriaEdit');
      const formLongDescription = document.getElementById('descripcion-corta-Edit');
      

      id.value = productToEdit._id;
      formName.value = productToEdit.name;
      formPrice.value = productToEdit.price;
      formStock.value = productToEdit.stock;
      formBrand.value = productToEdit.brand;
      formCategory.value = productToEdit.category;
      formLongDescription.value = productToEdit.longDescription;
      formImage.value = productToEdit.mainPhoto;
  }

    static async eventsFormEdit() {
      const formEdit = document.getElementById('myModalEdit');
      const buttonClosed = document.getElementById('closedModal');
      buttonClosed.addEventListener('click', ()=>{
        formEdit.classList.remove('hidden'); 
        console.log('click')
      });
    }
  

    static async addTableEvents() {
      
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                return;
            }
            if (e.target.classList.contains('btn-edit')) {
              const formEdit = document.getElementById('myModalEdit');
              formEdit.classList.remove('hidden'); 

              const inputId = document.getElementById('productIdEdit');
              inputId.disabled = true;

              PageAlta.completeForm(e);
          }
          
        });
    }

  // Función para crear un nuevo producto
static async createProduct() {
  const formImage = document.getElementById('image');
  const formName = document.getElementById('nombre');
  const formPrice = document.getElementById('precio');
  const formStock = document.getElementById('stock');
  const formBrand = document.getElementById('marca');
  const formCategory = document.getElementById('categoria');
  const formLongDescription = document.getElementById('descripcion-corta');

  const selectedText = formCategory.options[formCategory.selectedIndex].text;


  const productData = {
    mainPhoto: formImage.value, // Añadido el campo mainPhoto con la URL de la imagen
    name: formName.value,
    price: formPrice.value,
    stock: formStock.value,
    brand: formBrand.value,
    category: selectedText,
    longDescription: formLongDescription.value, // Cambiado a "longDescription"
  };

  try {
    const response = await productController.saveProduct(productData);

    if (response.ok) {
      alert('Producto agregado correctamente');
      form.reset();
      PageAlta.loadTable();
      return response;
    } else {
      console.log('');
    }
  } catch (error) {
    console.error(error);
  }
}

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table-container');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static async init () {
        console.log('PageAlta.init()');
         // Add an event listener to the form submission
        
        const form = document.getElementById('form');
        form.addEventListener('submit', async (e) => {
        window.history.replaceState({}, document.title, window.location.pathname);
        await PageAlta.createProduct();
        });        
        const formEdit = document.getElementById('myform');

      formEdit.addEventListener('submit', async (e) => {
        window.history.replaceState({}, document.title, window.location.pathname);
      await PageAlta.updateProduct(e);
      });
   
      PageAlta.prepareTable();
      }
}

/**
 * funcion para cerrar modal de formulario de edit
 */
function closedModalEdit() {
  document.getElementById('myModalEdit').classList.add('hidden');
}

// button x del modal 
const buttonClosed = document.getElementById('closed');
buttonClosed.addEventListener('click', closedModalEdit);


      
// evento tecla scape 
window.addEventListener('keydown', function(ev){
  if (ev.key === 'Escape') {
    console.warn('cerrar modal');
    closedModalEdit();
  }
});


// evento blur del modal 
const modal = document.getElementById('myModalEdit');
const modalOverlay = modal.querySelector('.modal-overlay');


// Evento al hacer clic en el fondo oscuro
modalOverlay.addEventListener('click', closedModalEdit);

export default PageAlta;
