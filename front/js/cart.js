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
            price : product.price
        }

        priceTable.push(objectPrice)

    });

    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)

    
    totalPrice = 0
    

    let i = 0
    totalArticles = 0


    cart.forEach(product => {
    console.log(product)


    //Défini la box des articles
    cart__items = document.getElementById('cart__items')

    //Article
    let cartArticle = document.createElement('article')
    cartArticle.setAttribute('class', "cart__item")
    cartArticle.setAttribute('data-ID', product.id)
    cartArticle.setAttribute('data-color', product.color)
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
    divContent.appendChild(divDescription)

    //Name
    let name = document.createElement('h2')
    name.textContent = product.name
    divDescription.appendChild(name)

    //Couleur
    let color = document.createElement('p')
    color.textContent = product.color
    divDescription.appendChild(color)

    //Price
    let price = document.createElement('p')
    //Trouver le prix dans le tableau de prix corresspondant à mon id
    let priceIndex = priceTable.findIndex( (prix) => prix.id === product.id)
    price.textContent = priceTable[priceIndex].price + " €"
    totalPrice = totalPrice + priceTable[priceIndex].price

    divDescription.appendChild(price)

    //div settings
    let divsettings = document.createElement('div')
    divsettings.setAttribute('class', "cart__item__content__settings")
    divContent.appendChild(divsettings)

    //div quantity
    let divquantity = document.createElement('div')
    divquantity.setAttribute('class', "cart__item__content__settings__quantity")
    divsettings.appendChild(divquantity)

    //Quantité
    let quantity = document.createElement('p')
    quantity.textContent = "Qté : " + product.qt
    divquantity.appendChild(quantity)
    
    //Input quantité
    let quantityInput = document.createElement('input')
    quantityInput.setAttribute('class', "itemQuantity")
    quantityInput.type = "number"
    quantityInput.name = "itemQuantity"
    quantityInput.min = "1"
    quantityInput.max = "100"
    quantityInput.value = 1
    divquantity.appendChild(quantityInput)
  


    //div delete
    let divdelete = document.createElement('div')
    divdelete.setAttribute('class', "cart__item__content__settings__delete")
    divsettings.appendChild(divdelete)

    //Supprimer
    let deleteItem = document.createElement('p')
    deleteItem.setAttribute('class', "deleteItem")
    deleteItem.textContent = "Supprimer"
    divdelete.appendChild(deleteItem)

    totalArticles = totalArticles + (product.qt * quantityInput.value)






        let itemQuantity= document.getElementsByName('itemQuantity')[i]
        i = i+1

        itemQuantity.addEventListener('change', function () {
            newtotalArticles = 0
            s = 0
            cart.forEach(product => {
                let itemQuantity= document.getElementsByName('itemQuantity')[s]
                newtotalArticles = newtotalArticles + (product.qt * itemQuantity.value)
                s = s+1 
            })
            document.getElementById('totalQuantity').textContent = newtotalArticles
        })

    })


   

    //Total quantity
    document.getElementById('totalQuantity').textContent = totalArticles

    //Total price
    document.getElementById('totalPrice').textContent = totalPrice


})
.catch(function(err) {
  console.log('erreur')
});















//Réucpere les panier en locaStorage

// 2 Option 
    //1 Récuper tous les produtis du site (Créer un new tableau de panier et produit site pour récuperer Prix)
    //2 Récupere le produit 1 par 1 (requet avec url produit)





