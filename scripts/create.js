import { createPost } from "./api.js";
import { getCurrentUser } from "./auth.js";

const d = document;
const $createPostForm = d.getElementById('create-post-form');

// Get admin data from localStorage
const currentAdmin = getCurrentUser();
const adminName = currentAdmin?.name;

if (!adminName) {
  window.location.href = '/excercice-test/account/login.html';
}

if ($createPostForm) {
  $createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData($createPostForm);
    const newPost = Object.fromEntries(formData);
    const mappedPost = {
      title: newPost.title,
      body: newPost.body,
      media: {
        url: newPost.image,
        alt: "Card image",
      }
    };

    try {
      const { data, errors, status, statusCode } = await createPost(mappedPost);
      console.log('Response:', { status, statusCode, data, errors });

      if (data && data.id) {
        alert('Post created successfully!');
        $createPostForm.reset();
      } else if (errors) {
        alert(`Error: ${errors[0].message}\nStatus: ${status} (${statusCode})`);
      }
    } catch (error) {
      alert('An error occurred during post creation. Please try again.');
    }
  });
}