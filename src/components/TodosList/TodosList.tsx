import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodosList.scss';

type Props = {
  todos: Todo[]
};

export const TodosList: React.FC<Props> = ({ todos }) => (
  <ul className="todosList">
    {todos.map(todo => (
      <li key={todo.id} className="todosList__item todo">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
