
fetch("http://localhost:3000/api/products")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(products) {

    let boxproducts= document.getElementById('items');
    console.log(boxproducts)

    products.forEach(product => {

        let card = document.createElement('a')
        card.href = "./product.html?id="+product._id;

        let card_article = document.createElement('article')

        let card_img = document.createElement('img')
        card_img.src = product.imageUrl
        card_img.alt = product.altTxt 

        let card_h3 = document.createElement('h3')
        card_h3.textContent = product.name

        let card_p = document.createElement('p')
        card_p.textContent = product.description


        boxproducts.appendChild(card)
        card.appendChild(card_article)
        card_article.appendChild(card_img)
        card_article.appendChild(card_h3)
        card_article.appendChild(card_p)
    });

})
.catch(function(err) {
  console.log('erreur')
});



