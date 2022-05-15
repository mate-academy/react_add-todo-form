import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map(item => (
        <li className="todoItem" key={item.id}>
          <TodoInfo todo={item} />
        </li>
      )).reverse()}
    </ul>
  );
};
