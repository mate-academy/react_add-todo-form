import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames({
          list__item: true,
          'list__item--done': todo.completed,
        })}
      >
        {todo.user && <UserInfo todo={todo} />}
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
