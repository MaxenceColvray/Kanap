let priceTable = []

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
            let priceIndex = priceTable.findIndex((element) => element.id === product.id)
            let tableidPrice = priceTable[priceIndex].price
            price.textContent = (tableidPrice * product.qt) + " €"
            totalPrice = totalPrice + (tableidPrice * product.qt)
            divDescription.appendChild(price)

            console.log(priceIndex)

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

            let itemQuantity = document.getElementsByName('itemQuantity')[i]
            let deleteButton = (document.getElementsByClassName('deleteItem'))[i]

            i = i + 1

            itemQuantity.addEventListener('change', function () {
                newtotalArticles = 0
                newtotalPrice = 0
                s = 0
                cart.forEach(product => {
                    let itemQuantity = document.getElementsByName('itemQuantity')[s]
                    newtotalArticles = newtotalArticles + (product.qt * itemQuantity.value)
                    newtotalPrice = newtotalPrice + ((priceTable[priceTable.findIndex((element) => element.id === product.id)].price) * product.qt * itemQuantity.value)
                    //newtotalPrice = newtotalPrice + tableidPrice * product.qt * itemQuantity.value ???????
                    s = s + 1

                })

                document.getElementById('totalQuantity').textContent = newtotalArticles
                document.getElementById('totalPrice').textContent = newtotalPrice
            })

            deleteButton.addEventListener('click', function () {
                let top = document.getElementById('cart__items')
                a = document.querySelector('[data-id="' + product.id + '"]')
                top.removeChild(a)

                let cartIndextodelete = cart.findIndex((element) => element.id === product.id)
                console.log(cart)
                cart.splice(cartIndextodelete, 1)
                console.log(cart)

                cart = JSON.stringify(cart)
                localStorage.setItem('cart', cart)
                window.location.reload();
            })

        })


        //Total quantity
        document.getElementById('totalQuantity').textContent = totalArticles

        //Total price
        document.getElementById('totalPrice').textContent = totalPrice

    })

    .catch(function (err) {
        console.log('erreur')
    });

/*----------Start contrôle de formulaire----------*/

//First Name
let input_firstName = document.getElementById('firstName')
let err_msg_FirtstName = document.getElementById('firstNameErrorMsg')
let regex_firstName = new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]") //que des lettres, espaces, tirets

input_firstName.addEventListener("input", function (element) {
    if (regex_firstName.test(element.target.value)) {

        err_msg_FirtstName.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux ou des chiffres"

    } else {

        err_msg_FirtstName.innerText = ""

    }
})

//Last Name
let input_lastName = document.getElementById('lastName')
let err_msg_lastName = document.getElementById('lastNameErrorMsg')
let regex_lastName = new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]") //que des lettres, espaces, tirets

input_lastName.addEventListener("input", function (element) {
    if (regex_lastName.test(element.target.value)) {

        err_msg_lastName.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux ou des chiffres"

    } else {

        err_msg_lastName.innerText = ""

    }
})

//address
let input_Address = document.getElementById('address')
let err_msg_Address = document.getElementById('addressErrorMsg')
let regex_Address = new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç0-9]") //que des lettres, espaces, tirets et chiffres

input_Address.addEventListener("input", function (element) {
    if (regex_Address.test(element.target.value)) {

        err_msg_Address.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux"

    } else {

        err_msg_Address.innerText = ""

    }
})

//City
let input_City = document.getElementById('city')
let err_msg_City = document.getElementById('cityErrorMsg')
let regex_City = new RegExp("[^a-zA-Z- àâäéèêëïîôöùûüÿç]") //que des lettres, espaces, tirets

input_City.addEventListener("input", function (element) {
    if (regex_City.test(element.target.value)) {

        err_msg_City.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux ou des chiffres"

    } else {

        err_msg_City.innerText = ""

    }
})

//Email
let input_Email = document.getElementById('email')
let err_msg_Email = document.getElementById('emailErrorMsg')
let regex_Email = new RegExp("[^a-z0-9-@.]") //que des lettres, espaces, tirets, @ et .

input_Email.addEventListener("input", function (element) {
    if (regex_Email.test(element.target.value)) {

        err_msg_Email.innerText = "Attention le champ ne peut pas contenir des caractères spéciaux ou des chiffres"

    } else {

        err_msg_Email.innerText = ""

    }
})
/*----------End contrôle de formulaire----------*/


let submitOrder = document.getElementById('order')
submitOrder.addEventListener("click", function () {

    let contact = {

        firstName: input_firstName.value,
        lastName: input_lastName.value,
        Address: input_Address.value,
        City: input_City.value,
        Email: input_Email.value

    }

    console.log(contact)
    console.log(contact)
});




/*fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(input_firstName.value)

});*/

