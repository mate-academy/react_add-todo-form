import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames('list__item',
          { 'list__item--not-ready': !todo.completed })}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
