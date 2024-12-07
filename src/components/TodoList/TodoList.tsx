import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../types';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(us => us.id === todo.userId);

        return <TodoInfo key={todo.id} user={user} todo={todo} />;
      })}
    </section>
  );
};
