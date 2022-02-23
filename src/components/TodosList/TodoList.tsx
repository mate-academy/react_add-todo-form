import React from 'react';
import { TodoInfo } from '../TodosInfo/TodoInfo';
import { UserWithTask } from '../../types/Todo';
import './TodosList.css';

type Props = {
  todos:UserWithTask[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todos__list">
      {
        todos.map(todo => (
          <li className="todos__item" key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))
      }
    </ul>
  );
};
