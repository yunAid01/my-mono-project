import apiClient from './client';

// -- todo --
// get posts
// get post by id
// create post
// update post by id
// delete post by id

/** get posts */
export const getPosts = async () => {
  const posts = await apiClient.get('/posts');
  return posts;
};
