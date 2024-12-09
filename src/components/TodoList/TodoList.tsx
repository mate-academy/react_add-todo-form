import React from 'react';
import '../../App.scss';
import { User } from '../UserInfo';
import { TodoInfo } from '../TodoInfo';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  const enrichedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
  return (
    <section className="TodoList">
      {enrichedTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
