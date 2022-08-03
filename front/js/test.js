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
})
.catch(function(err) {
  console.log('erreur')
});

console.log(priceTable)
console.log(priceTable[0])



    