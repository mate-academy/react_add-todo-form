import React from 'react';
import { TodoInfo } from '../TodoInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            userId={todo.userId}
          />
        );
      })}
    </section>
  );
};
