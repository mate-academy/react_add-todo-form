import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import users from '../../api/users';

export class TodoList extends React.Component {
  getUserById = userId => users.find(user => (userId === user.id));

  render() {
    return (
      <ol>
        {this.props.tasks.map(task => (
          <li
            className="task"
            key={task.id}
            data-completed={task.completed}
          >
            <label>
              <span
                className="task__title--not"
              >
                TASK:
                {' '}
              </span>
              {task.title}
              <br />
              <span>
                {`Employee: ${this.getUserById(task.userId).name}`}
              </span>
            </label>
          </li>
        ))}
      </ol>
    );
  }
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
