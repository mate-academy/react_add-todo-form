import React from 'react';
import classNames from 'classnames';

import { TodoWithUser } from '../types/TodoWithUser';
import { UserInfo } from './UserInfo';
import { TodoInfo } from './TodoInfo';

import './styles.scss';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="content">
      <ul className="list">
        {todos.map(todo => (

          <li
            className={classNames('list__item')}
            key={todo.id}
          >
            {todo.user && <UserInfo user={todo.user} />}
            {todo.user && <TodoInfo todo={todo} />}
          </li>

        ))}
      </ul>
    </div>
  );
};
