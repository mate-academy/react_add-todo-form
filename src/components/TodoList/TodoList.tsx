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
  return (
    <section className="TodoList">
      <TodoInfo todos={todos} users={users} />
    </section>
  );
};
