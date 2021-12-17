import React from 'react';

import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  handleChecked: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, handleChecked }) => {
  return (
    <div className="container">
      <ul>
        {todos.map(todo => (
          <li className="todoItem" key={todo.id}>
            <TodoInfo todo={todo} handleChecked={handleChecked} />
          </li>
        ))}
      </ul>
    </div>
  );
};
