import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../api/types';

interface TodoListProps {
  todos: Todo[];
  users?: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
