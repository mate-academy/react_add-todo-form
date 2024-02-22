import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Post } from '../../Types/Post';

type Props = {
  posts: Post[];
};

export const TodoList: React.FC<Props> = ({ posts }) => {
  return (
    <section className="TodoList">
      {posts.map(post => (
        <TodoInfo post={post} key={post.id} />
      ))}
    </section>
  );
};
