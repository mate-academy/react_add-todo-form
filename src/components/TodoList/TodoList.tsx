import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map(todo => (
        <li
          className={classNames(
            'list__item',
            { 'list__item--active': todo.completed },
          )}
          key={todo.id}
        >
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
