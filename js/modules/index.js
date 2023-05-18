// SPA 

setTimeout(()=>{
  const xhr = new XMLHttpRequest()
xhr.open("get", "../api/products/products.json")

xhr.addEventListener('load', ev=>{
  if (ev.target.status === 200) {
    const productsJSON = ev.target.responseText;
    const products = JSON.parse(productsJSON);
    let htmlCards = '';

    products.forEach(product => {
      console.log(product)
        htmlCards += `
        <div class="products_container-product_card">
            <h2>"Juguetería Cósmica"</h2> <br> <br> 
            <div class="products_container_product-card_product-image">
                <img src= "${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </div>
            <div class="products_container_description-product">
                <p>${product.description}</p>
                <p>${product.price} <span><i>${product.discount}</i></span> </p>
                <p>${product.costOfShipping} <span><a href="" title="add favorites">💌</a> </span></p>
            </div>
            <div class="products_container_product-card_card-button">
                <a href="#" class="buy">🛒 <span>Add to Cart</span></a>
            </div>
        </div>
        `
    });
    document.querySelector('.products_container').innerHTML = htmlCards;
  }
});

xhr.send()
console.log('home-inicio')
},100)


  


 