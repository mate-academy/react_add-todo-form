import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { User } from '../UserInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number | string;
  user?: User;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};

export { TodoList };
