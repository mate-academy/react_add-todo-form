import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';
import { User } from '../User/User';

export class Todo extends React.Component {
  state = {
    status: false,
  }

  render() {
    const { title, id, user } = this.props;
    const { status } = this.state;

    return (
      <>
        <User {...user} />
        <p>{title}</p>
        <label
          htmlFor={`status-check-${id}`}
          className={status ? 'todo-completed' : 'todo-uncompleted'}
        >
          {status ? 'Finished' : 'Not finished yet'}
        </label>
        <input
          type="checkbox"
          id={`status-check-${id}`}
          className="status-check"
          checked={status}
          onChange={(event) => {
            this.setState({
              status: event.target.checked,
            });
          }}
        />
      </>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
