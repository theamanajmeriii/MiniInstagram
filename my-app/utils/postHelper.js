const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/posts.json');

// READ ALL POSTS
function readPosts() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// WRITE POSTS
function writePosts(posts) {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

// FIND ONE POST
function findPostById(id) {
  const posts = readPosts();
  return posts.find(p => p.id === id);
}

// CREATE POST
function createPost(data) {
  const posts = readPosts();

  const newPost = {
    id: Date.now().toString(),
    username: data.username,
    image: data.image,
    caption: data.caption,
    createdAt: new Date().toISOString().split('T')[0]
  };

  posts.push(newPost);
  writePosts(posts);
}

// UPDATE POST
function updatePost(id, data) {
  const posts = readPosts();

  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return;

  posts[index].username = data.username;
  posts[index].image = data.image;
  posts[index].caption = data.caption;

  writePosts(posts);
}

// DELETE POST
function deletePost(id) {
  const posts = readPosts();
  const filtered = posts.filter(p => p.id !== id);
  writePosts(filtered);
}

module.exports = {
  readPosts,
  writePosts,
  findPostById,
  createPost,
  updatePost,
  deletePost
};