const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

const postsDir = path.join(process.cwd(), "content/professional/posts");

// Get all posts (for list page)
function getAllPosts() {
  const files = fs.readdirSync(postsDir);

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    const { data } = matter(raw);

    return {
      slug: file.replace(".md", ""),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: data.excerpt || "",
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get single post
function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    content: marked(content),
  };
}

module.exports = {
  getAllPosts,
  getPostBySlug,
};