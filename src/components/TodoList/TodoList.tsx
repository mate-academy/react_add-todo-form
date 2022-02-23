import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { HandleCheckbox } from '../../types/HandleCheckbox';

type Props = {
  todos: Todo[];
  handleCheckbox: HandleCheckbox;
};

export const TodoList: React.FC<Props> = ({ todos, handleCheckbox }) => (
  <ul className="todoList">
    {todos.map((todo) => {
      const {
        title,
        completed,
        user,
        id,
      } = todo;

      return (
        <li className="todoList__item" key={id}>
          <TodoInfo
            title={title}
            completed={completed}
            user={user}
            id={id}
            handleCheckbox={handleCheckbox}
          />
        </li>
      );
    })}
  </ul>
);
