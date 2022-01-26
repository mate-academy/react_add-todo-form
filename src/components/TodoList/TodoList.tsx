import React from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  todoList: Todo[]
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="data">
      {todoList.map(todo => {
        return (
          <li key={todo.id} className="data__dataOfUser">

            <TodoInfo
              {...todo}
            />
          </li>
        );
      })}
    </ul>
  );
};
