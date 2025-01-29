/* eslint-disable prettier/prettier */
import React from 'react';
import { Todo, User } from '../types';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);
        
        return (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            {user && (
              <a className="UserInfo" href={`mailto:${user.email}`}>
                {user.name}
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
};
