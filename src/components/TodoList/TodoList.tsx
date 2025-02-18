import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="TodoList">
    {todos.map(task => (
      <TodoInfo todo={task} key={task.id} />
    ))}
  </div>
);
