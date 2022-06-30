const stripeAPI = require('../stripe')

function calculateOrderAmount(cartItems) {
    return cartItems.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0) * 100;
}

async function paymentIntent(req, res) {
    const { cartItems, description, receipt_email, shipping } = req.body;

    let paymentIntent;

    try {
        paymentIntent = await stripeAPI.paymentIntents.create({
            amount: calculateOrderAmount(cartItems),
            currency: 'usd',
            description,
            payment_method_types: ['card'],
            receipt_email,
            shipping
        })

        const { clientSecret } = res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            'error': err
        })
    }
}

module.exports = paymentIntent;