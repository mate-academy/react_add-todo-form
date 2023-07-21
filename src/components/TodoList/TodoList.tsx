import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Post } from '../../types/Post';

type Props = {
  todos: Post[]
};

export const TodoList: React.FC<Props> = ({ todos: posts }) => {
  return (
    <section className="TodoList">
      {posts.map(post => {
        return <TodoInfo todo={post} key={post.id} />;
      })}
    </section>
  );
};
