/*------------------------------------------------------------*/
/*------------ Start 2.création de la page produit -----------*/
/*------------------------------------------------------------*/

/*L'objet URLSearchParams permet de récuprer la variable d'url pour pouvoir appeler l'API du produit*/
const urlParams = new URLSearchParams(window.location.search)
const varUrl = urlParams.get('id')

fetch("http://localhost:3000/api/products/" + varUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Vérifier l'url http://localhost:3000/api/products/" + varUrl)
    }
  })
  //Ajout des éléments du produit, appelé ici product, dans la page produit.
  .then(function (product) {

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
      option.value = color
      option.textContent = color
      select.appendChild(option)
    });
    /*------------------------------------------------------------*/
    /*------------- End 2.création de la page produit ------------*/
    /*------------------------------------------------------------*/


    /*------------------------------------------------------------*/
    /*------- Sart 3.Ajout du produit dans le localstorage -------*/
    /*------------------------------------------------------------*/

    //Création d'un evenement click sur le bouton "Ajouter au panier"
    const submitCart = document.getElementById('addToCart')
    submitCart.addEventListener('click', function () {

      //L'objectif est d'abord de créer un objet produit pour ensuite l'intégrer dans le local-storage
      //Le local-storage sera donc notre panier "virtuel" contenant un tableau d'objets

      //Ici on veut récupérer la valeur de l'input quantité pour l'intégrer dans l'objet produit  
      quantity = document.querySelector('.item__content__settings__quantity input').value
      quantity = parseInt(quantity)
      console.log(quantity)

      //On crée une alerte pour obliger l'acheteur à selectionner une option de couleur
      if (select.value === "") {
        alert('Vous devez choisir une couleur')
      } else {
        //Création de l'objet produit
        let produit = {
          id: product._id,
          img: product.imageUrl,
          altImg: product.altTxt,
          name: product.name,
          description: product.description,
          color: select.value,
          qt: quantity
        }

        //on crée la variable "cart" qui sera l'item cart du local-storage
        let cart = JSON.parse(localStorage.getItem('cart'))
        //Si aucun produit n'a déjà été ajouté au panier alors on créer le tableau et on y ajoute le produit
        if (localStorage.getItem('cart') == null) {
          cart = []
          cart.push(produit)
          cart = JSON.stringify(cart)//A chaque fois on transforme cart en JSON avant de l'intégrer dans le local-storage
          localStorage.setItem('cart', cart)

        } else {
          // Si le tableau "cart" contient un objet identique (même product id et même couleur) alors on modifie uniquement la quantité de l'objet existant
          if (cart.some(item => item.id === product._id & item.color === select.value)) {

            currentIndex = cart.findIndex((produit) => produit.id === product._id)
            currentObject = (cart[currentIndex])

            currentQt = currentObject.qt
            currentQt = parseInt(currentQt)

            currentObject.qt = currentQt + parseInt(quantity)
            console.log(currentObject)

            console.log(cart)
            cart = JSON.stringify(cart)
            localStorage.setItem('cart', cart)
            //Sinon on ajoute simplement "produit" dans le tableau "cart"
          } else {
            cart.push(produit)
            cart = JSON.stringify(cart)
            localStorage.setItem('cart', cart)
          }
        }
      }
      alert('Le produit a été ajouté au panier')
    });
    /*------------------------------------------------------------*/
    /*------- End 3.Ajout du produit dans le localstorage -------*/
    /*------------------------------------------------------------*/
  })
  .catch(function (err) {
    console.log('erreur')
  });






