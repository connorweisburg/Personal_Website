require("dotenv").config();

const express = require("express");
const path = require("path");

const { getAllPosts, getPostBySlug } = require("./lib/posts");

const app = express();

// Middleware
app.use(express.json()); // IMPORTANT for Stripe checkout
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

/* --------------------
   PAGE ROUTES
---------------------*/

// Home
app.get("/", (req, res) => {
    res.render("music");
});

// Music
app.get("/music", (req, res) => {
    res.render("music");
});
app.get("/about", (req, res) => {
    res.render("about");
});
// Professional (BLOG LIST)
app.get("/professional", (req, res) => {
    const posts = getAllPosts();
    res.render("professional", { posts });
});

// Single blog post
app.get("/professional/:slug", (req, res) => {
    const post = getPostBySlug(req.params.slug);

    if (!post) return res.status(404).send("Post not found");

    res.render("post", { post });
});

// Other
app.get("/other", (req, res) => {
    res.render("other");
});

/* --------------------
   ROUTES (MODULAR)
---------------------*/

// SHOP ROUTES (NEW)
app.use("/shop", require("./routes/shop"));

/* -------------------- */




// if (process.env.NODE_ENV !== "production") {
//     const PORT = 3000;

//     app.listen(PORT, () => {
//         console.log(`Server running at http://localhost:${PORT}`);
//     });
// }

module.exports = app;