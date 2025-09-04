import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Props } from '.';

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          // id={todo.id}
          // title={todo.title}
          // isCompleted={todo.completed}
          // user={todo.user!}
          todo={todo}
        />
      ))}
    </section>
  );
};
