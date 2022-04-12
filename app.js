const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const filter = require('leo-profanity');

const homeStartingContent = "Welcome to Easy Open Journal! Begin composing posts and see them appear on this Home page.";

var posts = [];

const app = express();
filter.loadDictionary();

mongoose.connect('MONGOURL');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);
//const testPost = new Post({title: 'Mongo Day', body: 'Today I am setting up MongoDB for persistent posts.'});

app.get('/', (req, res) => {
  Post.find({}, function(err, foundPosts) {
    res.render('home', {
      homeContent: homeStartingContent,
      posts: foundPosts,
      lodash: _
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/compose', (req,res) => {
  res.render('compose');
});

app.post('/compose', (req,res) => {
  const newPost = new Post({
    title: filter.clean(req.body.composeTitle),
    body: filter.clean(req.body.composePost)
  });

  newPost.save().then((value) => {
    res.redirect('/');
  });
});

//Using express routing parameters for dynamic URLs
app.get('/posts/:postId', (req,res) => {
  const postId = req.params.postId;

  Post.findById({_id: postId}, function(err, foundPost) {
    if (err) { return; }
    if (!foundPost) { res.render('404'); }
    else { res.render('post', {post: foundPost}); }
  });
});

app.get('/:lookup', (req, res) => {
  res.render('404');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
