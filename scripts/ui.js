const d = document;

export function createBlogCard(id, title, imagePath, body) {
  const $card = d.createElement('div');
  $card.className = 'blog-card';
  $card.style.cursor = 'pointer';
  $card.addEventListener('click', () => {
    window.location.href = 'post/post.html?id=' + id;
  });

  const $titleElement = d.createElement('h3');
  $titleElement.textContent = title;

  const $image = d.createElement('img');
  $image.src = imagePath;
  $image.alt = title;

  const $contentContainer = d.createElement('p');
  $contentContainer.textContent = body;

  $card.appendChild($titleElement);
  $card.appendChild($image);
  $card.appendChild($contentContainer);

  return $card;
}

export function createAdminCard(id, title, imageUrl, body) {
  const $card = d.createElement('div');
  $card.className = 'blog-card';

  const $titleElement = d.createElement('h3');
  $titleElement.textContent = title;

  const $image = d.createElement('img');
  $image.src = imageUrl;
  $image.alt = title;

  const $contentContainer = d.createElement('p');
  $contentContainer.textContent = body;

  const $buttonContainer = d.createElement('div');
  $buttonContainer.className = 'button-container';

  const $editLink = d.createElement('a');
  $editLink.href = 'post/edit.html?id=' + id;

  const $editButton = d.createElement('button');
  $editButton.className = 'edit-btn';

  const $editIcon = d.createElement('img');
  $editIcon.src = '../images/edit.svg';
  $editIcon.alt = 'Edit';
  $editIcon.className = 'button-icon';

  $editButton.appendChild($editIcon);
  $editLink.appendChild($editButton);

  const $deleteButton = d.createElement('button');
  $deleteButton.className = 'delete-btn';
  $deleteButton.dataset.id = id;

  const $deleteIcon = d.createElement('img');
  $deleteIcon.src = '../images/delete.svg';
  $deleteIcon.alt = 'Delete';
  $deleteIcon.className = 'button-icon';

  $deleteButton.appendChild($deleteIcon);

  $deleteButton.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const success = await deleteBlogPost(id);
    if (success) {
      $card.remove();
      alert('Post deleted successfully');
    } else {
      alert('Failed to delete post');
    }
  });

  $buttonContainer.appendChild($editLink);
  $buttonContainer.appendChild($deleteButton);

  $card.appendChild($titleElement);
  $card.appendChild($image);
  $card.appendChild($contentContainer);
  $card.appendChild($buttonContainer);

  return $card;
}

