import React from 'react';
import './Todo.css';

import PropTypes from 'prop-types';

import cn from 'classnames';

export class Todo extends React.Component {
  state = {
    isCompleted: false,
  };

  handleComplete = () => {
    this.setState(state => ({
      isCompleted: !state.isCompleted,
    }));
  }

  render() {
    const { todo } = this.props;
    const { isCompleted } = this.state;

    return (
      <li className={cn('todolist__item', { completed: isCompleted })}>
        <input
          type="checkbox"
          id="todo"
          className="todolist__check"
          onChange={this.handleComplete}
        />

        <span className="todolist__title">
          {todo.title}
        </span>

        <div className="todolist__user">
          <span className="todolist__user-name">
            {`for ${todo.user.name}`}
          </span>

          <span className="todolist__user-id">
            {`(User ${todo.userId})`}
          </span>
        </div>
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
