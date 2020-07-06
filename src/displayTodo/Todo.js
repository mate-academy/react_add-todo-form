import React from 'react';
import { todoShape } from '../shape';

const Todo = ({ completed, title, user, setCompleted, id }) => (
  <li className="taskList__unit">
    <div>
      <input
        type="checkbox"
        defaultChecked={completed}
        onChange={() => setCompleted(id)}
      />
      <span className="text">
        {title[0].toUpperCase() + title.slice(1)}
      </span>
    </div>
    <sub>{user.name}</sub>
  </li>
);

export { Todo };

Todo.propTypes = todoShape.isRequired;
