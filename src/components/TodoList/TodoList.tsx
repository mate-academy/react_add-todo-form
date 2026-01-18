import React from 'react';
import { Todo, User } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
  users?: User[];
}
export const TodoList: React.FC<TodoListProps> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId) || todo.user;

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
