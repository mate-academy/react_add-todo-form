import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Tasks = ({ title, addTasks, hasTitleError }) => (
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
      className={classNames(`fild new-fild`, {
        error: hasTitleError === true,
        '': hasTitleError === false,
      })}
      placeholder="Enter the task"
      value={title}
      onChange={addTasks}
    />
  </div>
);

Tasks.propTypes = {
  title: PropTypes.string.isRequired,
  addTasks: PropTypes.objectOf.isRequired,
  hasTitleError: PropTypes.objectOf.isRequired,
};
