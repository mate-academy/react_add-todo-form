import React from 'react';
import { ToDo } from '../../types/ToDo';
import './TodoList.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(({
      id,
      title,
      completed,
      user,
    }) => {
      return user && (
        <li
          key={id}
          className="todo-list__item item"
        >
          <TodoInfo title={title} completed={completed} />
          <UserInfo
            name={user.name}
            username={user.username}
            email={user.email}
            phone={user.phone}
            company={user.company}
          />
        </li>
      );
    })}
  </ul>
);
