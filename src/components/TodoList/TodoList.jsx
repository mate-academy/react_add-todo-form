import React from 'react';
import PropTypes from 'prop-types';
import { TodoPropTypes } from '../TodoPropTypes';
import { Todo } from '../Todo';

export const TodoList = function TodoList({ tasks }) {
  return (
    <ol className="list-group list-group-numbered">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item">
          <Todo
            title={task.title}
            user={task.user}
            userId={task.userId}
          />
        </li>
      ))}
    </ol>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(TodoPropTypes).isRequired,
};
