import { Todo } from '../types/Todo';

export const getNewPostId = (todos: Todo[]): number => {
  const maxId = todos.reduce((max, post) => (post.id > max ? post.id : max), 0);

  return maxId + 1;
};
