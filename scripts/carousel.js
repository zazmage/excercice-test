import { getPosts } from './api.js';

const d = document;

d.addEventListener('DOMContentLoaded', () => {
  const $imgEl = d.getElementById('carousel-img');
  const $captionEl = d.getElementById('carousel-caption');
  const $leftBtn = d.getElementById('left-btn');
  const $rightBtn = d.getElementById('right-btn');
  let currentIdx = 0, posts = [];

  const updateCarousel = () => {
    if (!posts.length) return;
    const post = posts[currentIdx];
    $imgEl.src = post.media.url;
    $imgEl.alt = post.title;
    $captionEl.textContent = post.title;
    $imgEl.onclick = () => {
      window.location.href = `post/post.html?id=${post.id}`;
    };
  };

  $leftBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + posts.length) % posts.length;
    updateCarousel();
  });

  $rightBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % posts.length;
    updateCarousel();
  });

  getPosts().then(fetchedPosts => {
    if (fetchedPosts && fetchedPosts.length > 0) {
      posts = fetchedPosts.slice(0, 3);
      updateCarousel();
    }
  });
});
