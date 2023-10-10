import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageInicio cargado.');

class PageInicio {
    async button () {
        document.getElementById('scrollButton').addEventListener('click', function() {
            console.log('diste click')
            document.querySelector(this.getAttribute('data-target')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/cards.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
        const addToCartButtons = document.querySelectorAll('.buy');

        addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
        const productId = this.dataset.productId;
        console.log(productId);
        console.log('¡Botón de comprar presionado!'); // Mensaje agregado
        const product = getProductById(productId);
            
        if (product) {
            handleCompra(product);
        }
        async function handleCompra(product) {
            const table = document.querySelector('.cart-table');
            const existingRow = table.querySelector(`tr[data-product-id="${product.id}"]`);
            console.log(existingRow);

        
            
                // Si el producto no está en la tabla, crear una nueva fila
                const newRow = document.createElement('tr');
        
                // Llenar la fila con la información del producto
                newRow.innerHTML = `
                    <td><img src="${product.mainPhoto}" alt="${product.name}" width="100"></td>
                    <td class="price">$${product.price}</td>
                    <td class="text-center">
                        <input type="number" class="quantityInput rounded-lg border-2 border-slate-600" min="1" max="10" value="1">
                    </td>
                    <td class="total">$${product.price}</td> 
                    <td><button> <i class='bx bxs-trash button_delete mt-4 text-[1.5rem]' title="delete product"></i></button></td>
                `;
        
                // Asignar el ID del producto a la fila
                newRow.dataset.productId = product.id;
        
                // Agregar la nueva fila a la tabla
                table.appendChild(newRow);
                
                // Asignar un evento al cambio en la cantidad
                const quantityInput = newRow.querySelector('.quantityInput');
                const priceElement = newRow.querySelector('.price');
                const totalElement = newRow.querySelector('.total');
        
                quantityInput.addEventListener('change', () => {
                    const quantity = parseInt(quantityInput.value);
        
                    const price = parseFloat(priceElement.textContent.substring(1)); // Eliminar el signo de dólar y convertir a número
                    const totalPrice = price * quantity;
                    
                    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
        
                    // Llamar a la función para recalcular el total general
                    calcularTotal();
                });
            // Cerrar el modal si lo deseas
            closeModal();
        }
        

        function getProductById(productId) {
            // Supongamos que tienes un array llamado 'products' con objetos de productos.
            // Puedes buscar el producto por su ID en el array.
            return products.find(product => product._id === productId);
        }
        
        });
});

    }
    static async init () {
        console.log('PageInicio.init()');

        const products = await productController.getProducts();
        PageInicio.renderTemplateCards(products);
    
        console.log(`Se encontraron ${products.length} productos.`);
        
      
    }
    
}


export default PageInicio;
