import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';
import TodoInfo from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo__list todo-list">
    {todos.map((todo) => (
      <li
        key={todo.id}
        className={classNames(
          'todo__item todo-item',
          { 'todo__item--done': todo.completed === true },
        )}
      >
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
