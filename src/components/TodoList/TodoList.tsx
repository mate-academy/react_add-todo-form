import { Post } from '../../utils/interface';
import { TodoInfo } from '../TodoInfo';
import React from 'react';

export const TodoList: React.FC<{ initialPosts: Post[] }> = ({
  initialPosts,
}) => {
  return (
    <section className="TodoList">
      {initialPosts.map(initialPost => {
        return <TodoInfo key={initialPost.id} initialPost={initialPost} />;
      })}
    </section>
  );
};
