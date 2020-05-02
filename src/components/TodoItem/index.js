import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import users from '../../api/users';
import './TodoItem.css';

export default class TodoItem extends Component {
  state = {
    usersForTask: users,
    completed: this.props.completed,
  }

  toogleCompleted = (e) => {
    e.preventDefault();
    this.setState(state => ({ completed: !state.completed }));
  }

  render() {
    const { title, userId = 0 } = this.props;
    const { usersForTask, completed } = this.state;
    const user = usersForTask.find(person => person.id === userId) || '';
    const todoItemClass = classNames('todo-item ', { ' completed': completed });

    return (
      <button
        type="button"
        className={todoItemClass}
        onClick={this.toogleCompleted}
        onKeyDown={this.handleClick}
      >
        <span className="task-title">{title}</span>
        <span className="task-user">{user.name}</span>
      </button>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
