import React from 'react';

import './todolist.scss';
import { PreparedTodo } from '../../react-app-env';
import { TodoInfo } from '../todoInfo';
import { UserInfo } from '../userinfo';

interface Props {
  preparedTodo: PreparedTodo[];
}

export const TodoList: React.FC<Props> = ({ preparedTodo }) => {
  return (
    <div>
      <ul>
        {preparedTodo.map(todo => (
          <div key={todo.id} className="conteiner">

            <li className="message is-primary">

              {todo.user && (
                <UserInfo user={todo.user} />
              )}

              <TodoInfo todo={todo} />

            </li>
          </div>
        ))}
      </ul>

    </div>
  );
};
