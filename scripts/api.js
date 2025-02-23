import { getCurrentUser } from './auth.js';

export async function getPosts() {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/biasza`);

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function createPost(mappedPost) {
  const admin = getCurrentUser();
  if (!admin) {
    throw new Error('No authentication found');
  }
  const { accessToken, name } = admin;
  try {
    const res = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(mappedPost),
    });
    return await res.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getPost(postId) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/biasza/${postId}`);

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error fetching single blog post:', error);
    return null
  }
}

export async function updatePost(postId, postData) {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const { accessToken, name } = user;

    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

export async function deletePost(postId) {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const { accessToken, name } = user;
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Error deleting post');
    }
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

