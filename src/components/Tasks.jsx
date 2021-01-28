import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Tasks = ({ title, addTasksOrUsers, hasTitleError }) => (
  <div className="task-title">
    {hasTitleError ? (
      <div className="title-error">
        Please enter a title
      </div>
    ) : (
      <lebel label htmlFor="task" className="new-task">
        New task
      </lebel>
    )
    }

    <input
      id="task"
      type="text"
      name="title"
      className={classNames(`block-form new-fild`, {
        error: hasTitleError === true,
        '': hasTitleError === false,
      })}
      placeholder="Enter the task"
      value={title}
      onChange={event => addTasksOrUsers(event.target.name, event.target.value)}
    />
  </div>
);

Tasks.propTypes = {
  title: PropTypes.string.isRequired,
  addTasksOrUsers: PropTypes.objectOf.isRequired,
  hasTitleError: PropTypes.objectOf.isRequired,
};
