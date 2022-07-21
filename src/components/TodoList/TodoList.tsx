import React from 'react';
import './TodoList.scss';

import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList todo__list">
    {todos.map(todo => (
      <React.Fragment key={todo.id}>
        <TodoInfo todo={todo} />
      </React.Fragment>
    ))}
  </ul>
);
