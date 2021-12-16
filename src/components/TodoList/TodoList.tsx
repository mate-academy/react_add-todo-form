import React from 'react';
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todo[],
  handleChecked: (id:number) => void
};

export const TodoList: React.FC<Props> = ({ preparedTodos, handleChecked }) => {
  return (
    <div className="TodoList__container">
      <ul className="TodoList">
        {preparedTodos.map(todo => (
          <li key={todo.id} className="TodoList__item">
            <TodoInfo todo={todo} handleChecked={handleChecked} />
          </li>
        ))}
      </ul>
    </div>
  );
};
