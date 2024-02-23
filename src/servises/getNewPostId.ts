import { Post } from '../Types/Post';

export function getNewPostId(posts: Post[]) {
  const maxId = Math.max(
    ...posts.map(post => post.id),
  );

  return maxId + 1;
}
