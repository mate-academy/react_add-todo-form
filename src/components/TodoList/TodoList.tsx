import React from 'react';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Array<{
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }>;
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoInfo todo={todo} key={todo.id} />
        </React.Fragment>
      ))}
    </section>
  );
};
