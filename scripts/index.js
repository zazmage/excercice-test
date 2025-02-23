import { getPosts } from './api.js';
import { createBlogCard } from './ui.js';

const d = document;

const renderCards = (posts, containerId) => {
  const $container = d.getElementById(containerId);
  const $fragment = d.createDocumentFragment();
  posts.forEach(post => {
    const $card = createBlogCard(post.id, post.title, post.media.url, post.body);
    $fragment.appendChild($card);
  });

  $container.appendChild($fragment);
};

d.addEventListener('DOMContentLoaded', async () => {
  const posts = await getPosts()
  if (posts) renderCards(posts, 'cards-container');
});