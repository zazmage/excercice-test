import { getPost } from './api.js';

const d = document;

const $postTitle = d.getElementById('post-title');
const $postImage = d.getElementById('post-image');
const $postBody = d.getElementById('post-body');
const $postAuthor = d.getElementById('post-author');
const $postDate = d.getElementById('post-date');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

d.addEventListener('DOMContentLoaded', async () => {
  const blogPost = await getPost(postId);
  if (blogPost) {
    $postTitle.innerText = blogPost.title;
    $postImage.src = blogPost.media.url;
    $postImage.alt = blogPost.media.alt;
    $postBody.innerText = blogPost.body;
    $postAuthor.innerText = "By " + blogPost.author.name;
    $postDate.innerText = new Date(blogPost.created).toLocaleDateString();
  }
});
