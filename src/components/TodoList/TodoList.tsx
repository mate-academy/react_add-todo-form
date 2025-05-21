import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoProps> = ({ todos }) => {
  return (
    <section className="TodoInfo">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
