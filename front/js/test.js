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
})

.catch(function(err) {
console.log('erreur')
});



//voir avec thomas