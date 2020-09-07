import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    status: false,
  }

  render() {
    const { todos } = this.props;
    const { status } = this.state;

    return (
      <div className="todolist">
        <div className="todolist__header">
          <p>Name</p>
          <p>Task</p>
          <p>Status</p>
        </div>
        {todos.map(todo => (
          <div key={todo.id} className="todolist__item">
            <p>{`${todo.user.name} (id: ${todo.user.id})`}</p>
            <p>{todo.title}</p>
            <label
              htmlFor={`status-check-${todo.id}`}
              className={status
                ? 'todolist__item--completed'
                : 'todolist__item--uncompleted'}
            >
              {status ? 'Completed' : 'Uncompleted'}
            </label>
            <input
              className="status-check"
              type="checkbox"
              id={`status-check-${todo.id}`}
              checked={status}
              onChange={(event) => {
                this.setState({
                  status: event.target.checked,
                });
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
