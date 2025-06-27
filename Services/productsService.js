const products = require('../Data/products.json')

function listProducts(req, res, next){
    res.json(products)
}

const productDetails = (req, res, next)=>{
    res.json(products[req.params.id])
}

const totalPrice = (req, res, next)=>{
    res.json({
        id: req.params.id,
        qt: req.params.qt,
        unit_price: products[req.params.id].price,
        total_price: products[req.params.id].price * req.params.qt

    })
}

const inStock = (req, res, next)=>{
    let productsInStock = []
    const { qt } = req.params
    for (const id in products) {
        if (products[id].stock >= qt) {
            productsInStock.push(products[id]);
        }
    }
    res.json(productsInStock)

}


module.exports = { listProducts, productDetails, totalPrice, inStock }