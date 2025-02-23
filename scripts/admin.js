import { getPosts } from './api.js';
import { createAdminCard } from './ui.js';

const renderCards = (posts, containerId) => {
  const container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();
  posts.forEach(post => {
    const card = createAdminCard(post.id, post.title, post.media.url, post.body);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async () => {
  const posts = await getPosts()
  if (posts) renderCards(posts, 'admin-cards-container');
});