import React from 'react';
import { Todo } from '../../types/Todo';
import './TodoList.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  removeTodo(id: number): void;
};

export const TodoList: React.FC<Props> = ({ todos, removeTodo }) => (
  <ul className="todo-list">
    {todos.map(({
      id,
      title,
      completed,
      user,
    }) => {
      return (
        <li
          key={id}
          className="todo-list__item item"
        >
          <button
            className="remove-button"
            type="button"
            onClick={() => removeTodo(id)}
          >
            X
          </button>
          <TodoInfo title={title} completed={completed} />
          {user && <UserInfo {...user} />}
        </li>
      );
    })}
  </ul>
);
