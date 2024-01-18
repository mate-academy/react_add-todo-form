import React from 'react';
import { TodowithUser } from '../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodowithUser[];
  // users: User[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          // user={todo}
        />
      ))}

    </section>
  );
};
