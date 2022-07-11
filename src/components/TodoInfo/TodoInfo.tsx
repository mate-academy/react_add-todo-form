import React from 'react';
import { Todo } from '../../Types/Todo';

import './TodoInfo.css';

export const TodoInfo: React.FC<Todo> = ({ title, completed, userId }) => (
  <>
    <div className="todo-info">
      {`Task: ${title}`}
    </div>

    <div className="todo-info" data-cy="status">
      {`Status: ${completed ? 'Done' : 'In progress'}`}
    </div>

    <div className="todo-info">
      {`User: ${userId}`}
    </div>
  </>
);
