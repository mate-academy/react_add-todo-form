import React from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>
          {todo.user && <UserInfo user={todo.user} />}
        </article>
      ))}
    </section>
  );
};
