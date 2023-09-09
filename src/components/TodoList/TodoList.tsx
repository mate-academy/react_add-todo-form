import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export interface Todo {
  id: number
  title: string,
  completed: boolean,
  userId: number | string,
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  }
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo
            todo={todo}
          />
        );
      })}
    </section>
  );
};

export { TodoList };
