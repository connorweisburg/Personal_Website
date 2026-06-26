// const express = require("express");
// const path = require("path");

// const { getAllPosts, getPostBySlug } = require("./lib/posts");

// const app = express();

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // EJS setup
// app.set("view engine", "ejs");

// // Home
// app.get("/", (req, res) => {
//     res.render("index");
// });

// // Music
// app.get("/music", (req, res) => {
//     res.render("music");
// });

// // Professional (BLOG LIST)
// app.get("/professional", (req, res) => {
//     const posts = getAllPosts();
//     res.render("professional", { posts });
// });

// // Professional (SINGLE POST)
// app.get("/professional/:slug", (req, res) => {
//     const post = getPostBySlug(req.params.slug);

//     if (!post) {
//         return res.status(404).send("Post not found");
//     }

//     res.render("post", { post });
// });

// // Other
// app.get("/other", (req, res) => {
//     res.render("other");
// });

// // // Start server
// // const PORT = 3000;

// // app.listen(PORT, () => {
// //     console.log(`Server running at http://localhost:${PORT}`);
// // });

// module.exports = app;





const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("SERVER IS ALIVE");
});

module.exports = app;