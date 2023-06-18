import { FC } from 'react';
import { Todo, TodoInfo } from '../TodoInfo';

type Todos = {
  todos: Todo[];
};

export const TodoList:FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
