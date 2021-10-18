import React from 'react';
import '../App.scss';
import users from '../api/users';
import TodoType from '../types/TodoType';

type Props = {
  todosTask: TodoType[];
};

export const TodoList: React.FC<Props> = ({ todosTask }) => {
  return (
    <ul className="app__list">
      {todosTask.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="app__list-item"
          >
            <div>
              {'Name: '}
              {newUser?.name}
              <br />
              {'Task: '}
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
