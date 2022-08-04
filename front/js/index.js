/*-----------Start 1.création des produit dans page d'accueil----------*/

//Appel à l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) { //products correspond au tableau de tous les objets 

    let boxproducts = document.getElementById('items');
    console.log(boxproducts)

    //Pour chaque objets, ici appelés product, on crée une card dans boxproducts =>
    products.forEach(product => {

      let card = document.createElement('a')
      card.href = "./product.html?id=" + product._id; //Défini l'url de la page produit (avec la variable d'url )
      boxproducts.appendChild(card)

      let card_article = document.createElement('article')
      card.appendChild(card_article)

      let card_img = document.createElement('img')
      card_img.src = product.imageUrl
      card_img.alt = product.altTxt
      card_article.appendChild(card_img)

      let card_h3 = document.createElement('h3')
      card_h3.textContent = product.name
      card_article.appendChild(card_h3)

      let card_p = document.createElement('p')
      card_p.textContent = product.description
      card_article.appendChild(card_p)
    });

  })
  .catch(function (err) {
    console.log('erreur')
  });
/*-----------End 1.création des produit dans page d'accueil----------*/



