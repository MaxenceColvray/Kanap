/*------------------------------------------------------------*/
/*--------- Start 8.Affichage du numéro de commande ----------*/
/*------------------------------------------------------------*/
const urlParams = new URLSearchParams(window.location.search)
const varUrl = urlParams.get('orderId')
console.log(varUrl)

document.getElementById('orderId').innerText = varUrl
/*------------------------------------------------------------*/
/*---------- End 8.Affichage du numéro de commande -----------*/
/*------------------------------------------------------------*/