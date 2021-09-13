import React from 'react';
import '../App.css';
import users from '../api/users';

export interface Todo {
  title: string;
  id: number;
  userId: number | null;
}

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="app__todo-list">
      {todos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="list-group-item list-group-item-info"
          >
            <div>
              TODO:
              {' '}
              {todo.title}
            </div>
            <div>
              NAME:
              {' '}
              {newUser?.name}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
