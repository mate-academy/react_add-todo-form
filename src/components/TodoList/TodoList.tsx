import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map(todo => (
      <li key={todo.id} className="TodoList__item">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
