/*------------------------------------------------------------*/
/*------------ Start 4.Création d'un tableau de prix ---------*/
/*------------------------------------------------------------*/
//Le tableau de prix "priceTable" doit contenir le prix de tous les produits du site  
//on enregistre pas le prix dans l'objet "produit" sur le local-storage pour des raisons de sécurité

let priceTable = []
//Pour exemeple question ??????? let cart = 0
/*Pour exemeple question ??????? let setCart = () => {
    cart = JSON.stringify(cart)
    localStorage.setItem('cart', cart)
    cart = JSON.parse(cart)
}*/
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (products) {
        console.log(products)

        products.forEach(product => {

            let objectPrice = {
                id: product._id,
                price: product.price
            }

            priceTable.push(objectPrice)

        });
        console.log(priceTable)
        /*------------------------------------------------------------*/
        /*------------ End 4.Création d'un tableau de prix -----------*/
        /*------------------------------------------------------------*/


        /*------------------------------------------------------------*/
        /*---------------- Start 5.Affichage du panier ---------------*/
        /*------------------------------------------------------------*/
        let cart = JSON.parse(localStorage.getItem('cart'))//Récupère le panier en langage JavaScript

        let i = 0
        let priceIndex = 0

        let totalsCalculation = () => {
            document.getElementById('totalQuantity').textContent = totalArticles = 0
            document.getElementById('totalPrice').textContent = totalPrice = 0
            cart.forEach(product => {
                //Articles total
                totalArticles = totalArticles + parseInt(product.qt)
                document.getElementById('totalQuantity').textContent = totalArticles
                //Articles prix
                totalPrice = totalPrice + ((priceTable[priceIndex].price) * product.qt)
                document.getElementById('totalPrice').textContent = totalPrice
            })
        }

        let setCart = () => {
            cart = JSON.stringify(cart)
            localStorage.setItem('cart', cart)
            cart = JSON.parse(cart)
        }

        cart.forEach(product => {
            console.log(product)

            //Box des articles
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
            priceIndex = priceTable.findIndex((element) => element.id === product.id)
            price.textContent = priceTable[priceIndex].price + " €"
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
            quantity.textContent = "Qté : "
            divquantity.appendChild(quantity)

            //Input quantité
            let quantityInput = document.createElement('input')
            quantityInput.setAttribute('class', "itemQuantity")
            quantityInput.type = "number"
            quantityInput.name = "itemQuantity"
            quantityInput.min = "1"
            quantityInput.max = "100"
            quantityInput.value = parseInt(product.qt)
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

            //Evénement pour changer la quantité 
            let itemQuantity = document.getElementsByName('itemQuantity')
            itemQuantity[i].addEventListener('change', function () {
                s = 0
                cart.forEach(product => {
                    console.log(itemQuantity[s].value)
                    product.qt = itemQuantity[s].value
                    s = s + 1
                })
                setCart()
                totalsCalculation()
            })
            //Evénement pour supprimer
            let deleteButton = (document.getElementsByClassName('deleteItem'))
            deleteButton[i].addEventListener('click', function () {
                Article_to_remove = document.querySelector('[data-id="' + product.id + '"][data-color="' + product.color + '"]')
                cart__items.removeChild(Article_to_remove)

                let cartIndextodelete = cart.findIndex((element) => element.id === product.id)
                cart.splice(cartIndextodelete, 1)

                setCart()
                totalsCalculation()
            })
            i = i + 1
        })
        totalsCalculation()
    })
    .catch(function (err) {
        console.log('erreur')
    });
/*------------------------------------------------------------*/
/*---------------- End 5.Affichage du panier -----------------*/
/*------------------------------------------------------------*/


/*------------------------------------------------------------*/
/*---------------- Start 6.Contrôle de formulaire --------------*/
/*------------------------------------------------------------*/
function validate_field(input_id, error_id, regex) {
    let input = document.getElementById(input_id)
    let el_error = document.getElementById(error_id)

    if (regex.test(input.value)) {
        el_error.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux ou des chiffres"
    } else if (input.value == "") {
        el_error.innerText = "Attention le champ ne peut pas être vide"
    } else {
        el_error.innerText = ""
        return true
    }
}

function validate_form() {
    if (!validate_field('firstName', 'firstNameErrorMsg', new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]"))) { //Si validate_field() est different de true
        return false;
    }
    if (!validate_field('lastName', 'lastNameErrorMsg', new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]"))) {
        return false;
    }
    if (!validate_field('address', 'addressErrorMsg', new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç,;°'0-9]"))) {
        return false;
    }
    if (!validate_field('city', 'cityErrorMsg', new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]"))) {
        return false;
    }
    if (!validate_field('email', 'emailErrorMsg', new RegExp("[^a-z0-9-@.]"))) {
        return false;
    }
    return true;
}
/*------------------------------------------------------------*/
/*---------------- End 6.Contrôle de formulaire --------------*/
/*------------------------------------------------------------*/


/*------------------------------------------------------------*/
/*--------- Start 7.Envoi de l'objet customerObject ----------*/
/*------------------------------------------------------------*/

let submitOrder = document.getElementById('order')
submitOrder.addEventListener("click", function (e) {
    e.preventDefault() //Annule le reload et les fonctions de contrôles par défauts
    validate_form()
    console.log(validate_form())

    if (validate_form()) {

        let contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }

        let cart = JSON.parse(localStorage.getItem('cart'))
        let products = []
        cart.forEach(product => {
            products.push(product.id)
        })

        let customerObject = {
            contact,
            products
        }

        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerObject)

        }).then(data => {
            console.log(data) //fetch renvoie un objet réponse
            return data.json();
        }).then(reponse => {
            console.log(reponse)
            console.log(reponse.orderId)
            window.location.href = `./confirmation.html?orderId=${reponse.orderId}`//renvoie sur la page confirmation avec ds l'Url la variable d'Url reponse.orderId
        });
    } else {
        console.log(`la fonction validate_form() est ${validate_form()}`)
    }
})
/*----------------------------------------------------------*/
/*---------- End 7.Envoi de l'objet customerObject ---------*/
/*----------------------------------------------------------*/




/*
------- Question --------
- Comment voir mes objets apès le post ?
- Exemple fonction setCart, pk je peux pas la mettre en haut ?
- Concept code asynchrone pourquoi je peux pas lire cart dans 7. pareil pour validate_form
- Data et réponse ?

 
*/








