
/*Créé un objet pour récuprer la variable d'url*/
const urlParams = new URLSearchParams(window.location.search)
const varUrl = urlParams.get('id')
console.log(varUrl)



/*Rajouter condition if pour savoir si varUrl existe ???*/
fetch("http://localhost:3000/api/products/"+varUrl)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(product) {
  console.log(product._id)
  //Afichage du produit//

  //image
  let itemImg = document.getElementsByClassName('item__img')[0]; 
  let card_img = document.createElement('img')
  card_img.src = product.imageUrl
  card_img.alt = product.altTxt 
  itemImg.appendChild(card_img)

  //Nom
  let title = document.getElementById('title');
  title.textContent = product.name;

  //Prix
  let price = document.getElementById('price');
  price.textContent = product.price;

  //Description
  let description = document.getElementById('description');
  description.textContent = product.description;
  
  //Option de couleurs
  let select = document.getElementsByTagName('select')[0]
    product.colors.forEach(color => {

      let option = document.createElement('option')
      option.value= color
      option.textContent = color
      select.appendChild(option)
  });

  

  //Ajout du produit dans le localstorage//
  const submitCart = document.getElementById('addToCart')
  submitCart.addEventListener('click' , function(){


    //récupère la  valeur de l'input quantité 
    quantity = document.querySelector('.item__content__settings__quantity input').value
    quantity = parseInt(quantity)
    console.log(quantity)

    //récupère la  valeur de l'option couleur
    console.log(select.value)
    if (select.value === "") {

      alert('Vous devez choisir une couleur')

    }

    else {

    //Création du produit pour le panier
    let produit = {

      id: product._id,
      img: product.imageUrl,
      altImg : product.altTxt,
      name : product.altTxt,
      description : product.description,
      color : select.value,
      qt : quantity

    }

    console.log(produit)


    let cart = JSON.parse(localStorage.getItem('cart'))

    if (localStorage.getItem('cart') == null ) {
    
      cart = []
      cart.push(produit)
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)


    } else {
      // Si cart contient un objet dont l'id est égale à mon product id (id du produit actuellment sur la page) et une couleur differente
      if (cart.some(item => item.id === product._id & item.color === select.value))/*   ??????*/ {

        currentIndex = cart.findIndex( (produit) => produit.id === product._id)
        console.log(currentIndex)

        currentObject = (cart[cart.findIndex( (produit) => produit.id === product._id)])
        console.log(currentObject)

        currentQt = currentObject.qt
        currentQt = parseInt(currentQt)

        currentObject.qt = currentQt + quantity
        console.log(currentObject)
 
        console.log(cart)
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)

        } else {
          cart.push(produit)
          cart = JSON.stringify(cart)
          localStorage.setItem('cart', cart)
        }
    }
  }
  });
  
})
.catch(function(err) {
  console.log('erreur')
});




//Récupere la panier //Si n'est pas vide, ajoutre le new produit //Si vide, créer un tableeau pui ajouter le produit
//let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []


