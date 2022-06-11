import React from 'react';
import { Todos } from '../types/types';
import { TodosInfo } from '../TodosInfo/TodosInfo';

import './TodosList.scss';

type Props = {
  prepared: Todos[],
};

export const TodoList: React.FC<Props> = ({ prepared }) => (
  <div className="list">
    {prepared.map((todo) => (
      <div className="list__item" key={todo.id}>
        <TodosInfo todo={todo} />
      </div>
    ))}
  </div>
);
