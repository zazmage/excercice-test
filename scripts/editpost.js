import { getPost, updatePost } from './api.js';
import { getCurrentUser } from './auth.js';

const d = document;
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const $form = d.getElementById('edit-post-form');
const $titleInput = d.getElementById('title');
const $bodyInput = d.getElementById('body');
const $imageInput = d.getElementById('image');

const currentAdmin = getCurrentUser();
const adminName = currentAdmin?.name;

if (!adminName) {
  window.location.href = '/excercice-test/account/login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!postId) {
    window.location.href = '/excercice-test/post/admin.html';
    return;
  }

  const post = await getPost(postId);

  if (!post) {
    window.location.href = '/excercice-test/post/admin.html';
    return;
  }

  $titleInput.value = post.title;
  $bodyInput.value = post.body;
  $imageInput.value = post.media.url;
});

$form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const updatedPost = {
      title: $titleInput.value.trim(),
      body: $bodyInput.value.trim(),
      media: {
        url: $imageInput.value.trim(),
        alt: "Card image"
      }
    };

    const result = await updatePost(postId, updatedPost);
    if (result) {
      window.location.href = '/excercice-test/post/admin.html';
    } else {
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    alert(`Failed to update post: ${error.message}`);
  }
});