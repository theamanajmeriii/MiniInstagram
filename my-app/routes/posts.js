var express = require('express');
var router = express.Router();
const postHelper = require('../utils/postHelper');

router.get('/', function(req, res) {
  const posts = postHelper.readPosts();
  const search = req.query.search;

  let filteredPosts = posts;

  if (search) {
    filteredPosts = posts.filter(p =>
      p.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.render('posts/index', { posts: filteredPosts, search });
});

router.get('/new', function(req, res) {
  res.render('posts/new');
});

router.get('/:id/edit', function(req, res) {
  const post = postHelper.findPostById(req.params.id);

  if (!post) return res.send('Post not found');

  res.render('posts/edit', { post });
});


router.post('/:id/delete', function(req, res) {
  postHelper.deletePost(req.params.id);
  res.redirect('/posts');
});



router.get('/:id', function(req, res) {
  const post = postHelper.findPostById(req.params.id);
  if (!post) return res.send('Post not found');

  res.render('posts/show', { post });
});


router.post('/', function(req, res) {
  postHelper.createPost(req.body);
  res.redirect('/posts');
});

router.post('/:id', function(req, res) {
  postHelper.updatePost(req.params.id, req.body);
  res.redirect('/posts/' + req.params.id);
});


module.exports = router;