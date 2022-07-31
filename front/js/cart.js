let priceTable = []
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(products) {
    console.log(products)

    products.forEach(product => {

        let objectPrice = {
            id : product._id,
            Price : product.price,
        }

        priceTable.push(objectPrice)

    });

    console.log(priceTable)


})
.catch(function(err) {
  console.log('erreur')
});



let cart = JSON.parse(localStorage.getItem('cart'))

console.log(cart)

cart.forEach(product => {

console.log(product)

//Défini la box des articles
cart__items = document.getElementById('cart__items')

//Article
let cartArticle = document.createElement('article')
//data-id
//data-color
cart__items.appendChild(cartArticle)

//Img
let divImg = document.createElement('div')
divImg.setAttribute('class', "cart__item__img")
cartArticle.appendChild(divImg)

let Img = document.createElement('img')
Img.src = product.img
Img.alt = product.altImg
divImg.appendChild(Img)

//div content
let divContent = document.createElement('div')
divContent.setAttribute('class', "cart__item__content")
cartArticle.appendChild(divContent)

//div content description
let divDescription = document.createElement('div')
divDescription.setAttribute('class', "cart__item__content__description")
cartArticle.appendChild(divDescription)








});











//Réucpere les panier en locaStorage

// 2 Option 
    //1 Récuper tous les produtis du site (Créer un new tableau de panier et produit site pour récuperer Prix)
    //2 Récupere le produit 1 par 1 (requet avec url produit)



//Ajout d'un article dans le panier


// let cart__item = document.getElementById('cart__items');

// let newArticle = document.createElement('article')
// newArticle.id=localStorage.getItem('id')
// //newArticle.=localStorage.getItem('color')
// cart__item.appendChild(newArticle)

// console.log(newArticle)
// newArticle.innerHTML = '<div class="cart__item__img"><img src='+localStorage.getItem('img')+' alt='+localStorage.getItem('alt_img')+'></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>'+localStorage.getItem('title')+'</h2><p>XXX</p><p>'+localStorage.getItem('price')+'€</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : '+localStorage.getItem('qt')+'</p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div>';


// img.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;


// //total articles
// let itemQuantity = document.getElementsByClassName('itemQuantity')[0].value
// console.log(itemQuantity)
// let totalQt = document.getElementById('totalQuantity')
// totalQt.textContent = localStorage.getItem('qt')*itemQuantity

// //total prix
// let totalPrice = document.getElementById('totalPrice')
// totalPrice.textContent = localStorage.getItem('price')*totalQt.textContent


