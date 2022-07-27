import React from 'react';
import './TodoList.scss';

import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <div className="todos">
    {todos.map(todo => (
      <TodoInfo todo={todo} />
    ))}
  </div>
);
