import { getPosts } from './api.js';
import { getCurrentUser } from './auth.js';
import { createAdminCard } from './ui.js';

const d = document;

const currentAdmin = getCurrentUser();
const adminName = currentAdmin?.name;

if (!adminName) {
  window.location.href = '/excercice-test/account/login.html';
}

const renderCards = (posts, containerId) => {
  const $container = d.getElementById(containerId);
  const $fragment = d.createDocumentFragment();
  posts.forEach(post => {
    const $card = createAdminCard(post.id, post.title, post.media.url, post.body);
    $fragment.appendChild($card);
  });

  $container.appendChild($fragment);
};

d.addEventListener('DOMContentLoaded', async () => {
  const posts = await getPosts()
  if (posts) renderCards(posts, 'admin-cards-container');
});