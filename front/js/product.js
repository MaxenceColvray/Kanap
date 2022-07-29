
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
  product.colors.forEach(color => {
    let select = document.getElementsByTagName('select')[0]
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
    console.log(quantity)

    //Création du produit pour le panier
    let produit = {

      id : product._id,
      description : product.description,
      qt : quantity

    }

    //Envoie le produit dans le tableau panier puis push dans localstorage au format JSON


    //si produit est deja dans le tableau alors message alert sinon push 

    //let cart =[localStorage.getItem('cart')]
    //console.log(cart)

    //let cart = localStorage.setItem('cart', cart)

    //j'incremente mon tableau
    let cart = JSON.parse(localStorage.getItem('cart'))

    if (localStorage.getItem('cart') == null ) {
    
      cart = []
      cart.push(produit)
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)

      console.log(cart)

    } else {

      //si produit deja existant alors nothing sinon 
      

      cart.push(produit)
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)

      console.log(cart)

    }


   /* console.log(cart)

    cart.push(produit)
    console.log(cart)

    //je transforme mont tableau en json et je l'ajoute dans localstorage
    cart = JSON.stringify(cart)

    localStorage.setItem('cart', cart)
    console.log(cart)*/
  





   /* if (localStorage.getItem('cart') == null ) {
      console.log('oui')
      let cart = []
      cart.push(produit)
      console.log(cart)
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
      console.log(cart)
    } else {

    };*/



    //let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []





    
   /*cart = JSON.stringify(cart)
   localStorage.setItem('cart', cart)*/

    });
})
.catch(function(err) {
  console.log('erreur')
});



//voir avec thomas


        /*
        

        console.log(produit)

        //Récupere la panier //Si n'est pas vide, ajoutre le new produit //Si vide, créer un tableeau pui ajouter le produit
        let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []

        console.log(panier)

       
            
                //Si le produit existe modifier la quantité
                // sinon ajouter le produit
                panier.push(produit)
            

        

        //Enregistre le panier
        panier = JSON.stringify(panier)
        localStorage.setItem('panier',panier)
        
        
        // localStorage.setItem('id',varUrl)

        // localStorage.setItem('color',optionSelect)// Voir avec thomas ????
        // localStorage.setItem('img',product.imageUrl)
        // localStorage.setItem('alt_img',product.altTxt)
        // localStorage.setItem('title',product.name)
        // localStorage.setItem('price',product.price)
        
        // let quantity = document.getElementById('quantity').value
        // localStorage.setItem('qt',quantity)*/

