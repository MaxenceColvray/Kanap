/*Créé un objet pour récuprer la variable d'url*/
const urlParams = new URLSearchParams(window.location.search)
const varUrl = urlParams.get('id')
console.log(varUrl)



fetch("http://localhost:3000/api/products/"+varUrl)
.then(function(datar){

    return datar.json()
    
    })
.then(function(zz){
    console.log(zz)

    const submitCart = document.getElementById('addToCart')
    submitCart.addEventListener('click' , function(){
        let produit = {
            id : 1,
            description : 2,
            qt : 3
          }
          console.log(produit)

        let cart = [1,2,3,4,5]
        console.log(cart)
       

        if (cart.some(produit => produit.id === 5))  {

            console.log('contient')

        } else{

            console.log('contient pas')

        }

        

        
        })

    })

.catch(function(err) {
console.log('erreur')
});



//voir avec thomas