import React from 'react';
import users from '../../api/users';

import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      <div>
        <ul className="TodoList__ul">
          {todos.map(todo => (
            <li className="TodoList__li">
              <div>
                Todo title:
                {' '}
                {todo.title}
              </div>
              <div>
                Performancer todo:
                {' '}
                {users.find(user => (
                  user.id === todo.userId
                ))?.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
