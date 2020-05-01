import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

class Todo extends PureComponent {
  render() {
    const { id, title, completed, user } = this.props.todo;

    return (
      <li className={
        completed
          ? 'todo__item todo__item--done'
          : 'todo__item'
      }
      >
        <div className="todo__item-task">
          {title}
        </div>
        <div className="todo__item-status">
          {completed
            ? <span className="todo__item-status-done">Done</span>
            : <span className="todo__item-status-inprocess">In process</span>}
        </div>
        <div className="todo__item-name">
          <span className="todo__item-subtitle">
            Performer:
          </span>
          {user.name}
        </div>
        <button
          className="todo__item-delete-btn"
          onClick={() => this.props.deleteTodo(id)}
          type="button"
          title="Delete current task"
        >
          x
        </button>
        <button
          className={
            completed
              ? 'todo__item-toggle-btn todo__item-toggle-btn--active'
              : 'todo__item-toggle-btn'
          }
          onClick={() => this.props.statusToggle(id)}
          type="button"
        >
          {!completed
            ? 'Mark as complited'
            : 'Mark as in process'}
        </button>
      </li>
    );
  }
}

Todo.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  statusToggle: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Todo;
