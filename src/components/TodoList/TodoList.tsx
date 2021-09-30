import React from 'react';
import { TodoInfo } from '../TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div className="users">
      <div className="users__info">
        <ul className="users__info-list">
          <li className="users__info-item">Name</li>
          <li className="users__info-item">Email</li>
          <li className="users__info-item">Task</li>
          <li className="users__info-item">Finished</li>
        </ul>
      </div>
      <div className="users__table">
        {todos.map(todo => (
          <ul
            className="users__table-list"
            key={todo.id}
          >
            <TodoInfo todo={todo} />
          </ul>
        ))}
      </div>
    </div>
  );
};
