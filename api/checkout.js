const stripeApi = require('../stripe')

async function createCheckoutSession(req, res) {

    const domainUrl = process.env.WEB_APP_URL

    const { line_items, customer_email } = req.body;

    //check request body for line items and email

    if (!line_items || !customer_email) {
        return res.status(400).json({ error: 'missing required session parameters' })
    }

    let session;

    try {
        session = await stripeApi.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/success?success_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/canceled`,
            shipping_address_collection: { allowed_countries: ['GB', 'US'] }
        });

        res.set('Access-Control-Allow-Origin', '*')
        res.status(200).json({ sessionId: session.id })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

module.exports = createCheckoutSession;