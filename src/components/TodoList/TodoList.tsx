import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/userInfo';
import './TodoList.scss';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <div className="content card card-content">
          <li key={todo.id}>
            <div className="columns">
              <div className="column">
                <TodoInfo todo={todo} />
              </div>
              {todo.user && (
                <div className="column">
                  <UserInfo user={todo.user} />
                </div>
              )}

            </div>
          </li>

        </div>
      ))}
    </ul>
  );
};
