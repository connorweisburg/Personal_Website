const express = require("express");
const router = express.Router();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * GET /shop
 * just renders your EJS page
 */
router.get("/", (req, res) => {
    res.render("shop");
});

/**
 * GET /shop/products
 * pulls Stripe product catalog
 */
router.get("/products", async (req, res) => {
    try {
        const products = await stripe.products.list({
            active: true,
            expand: ["data.default_price"],
        });

        const formatted = products.data.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            image: p.images?.[0],
            price: p.default_price?.unit_amount,
            priceId: p.default_price?.id,
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load products" });
    }
});

/**
 * POST /shop/checkout
 */
router.post("/checkout", async (req, res) => {
    try {
        const { priceId } = req.body;

        if (!priceId) {
            return res.status(400).json({ error: "Missing priceId" });
        }

        const domain = process.env.DOMAIN;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${domain}/shop`,
            cancel_url: `${domain}/shop`,
        });

        return res.json({ url: session.url });

    } catch (err) {
        console.error("❌ STRIPE ERROR:", err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;