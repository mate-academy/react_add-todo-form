import React from 'react';
import { Todo, User } from '../types';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <ul className="todoList">
      {
        todos.map(todo => {
          const isCompleted = todo.completed ? 'yes' : 'no';
          const user = users.find(person => person.id === todo.userId);

          return (
            <li key={todo.id} className="todoList__item">
              <h2>{todo.title}</h2>
              <p>{`User: ${user?.name}`}</p>
              <span className={isCompleted}>{`Is it done: ${isCompleted}`}</span>
            </li>
          );
        })
      }
    </ul>
  );
};
