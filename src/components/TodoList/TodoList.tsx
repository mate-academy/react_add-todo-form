import React from 'react';
import { TodoInfo, Todo } from '../TodoInfo'; // Импортируем тип Todo

type Props = {
  todos: Todo[]; // Вместо any[] используем Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
