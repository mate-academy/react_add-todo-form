import React from 'react';
import PropTypes from 'prop-types';

import { TodoList } from '../TodoList';
import { TodoShape } from '../shapes/TodoShape';

import './AddTaskForm.scss';

export class AddTaskForm extends React.PureComponent {
  state = {
    selectedUser: 0,
    taskTitle: '',
    error: '',
    todos: this.props.todos,
  }

  handleTitle = (event) => {
    this.setState({
      taskTitle: event.target.value,
      error: '',
    });
  }

  selectUser = (event) => {
    this.setState({
      selectedUser: +event.target.value,
      error: '',
    });
  }

  createTask = (event) => {
    const { taskTitle, selectedUser } = this.state;
    const isTitle = !taskTitle.length;

    event.preventDefault();

    if (isTitle || !selectedUser) {
      this.setState({
        error: (isTitle && 'title') || 'user',
      });

      return;
    }

    this.setState(state => ({
      selectedUser: 0,
      taskTitle: '',
      error: '',
      todos: [
        {
          userId: state.selectedUser,
          id: state.todos.length + 1,
          title: taskTitle,
          completed: false,
        },
        ...state.todos,
      ],
    }));
  }

  render() {
    const { state, handleTitle, selectUser, createTask, props } = this;
    const { taskTitle, selectedUser, error, todos } = state;

    return (
      <>
        <form
          name="AddTaskForm"
          onSubmit={createTask}
        >
          <div className="form-group sizing">
            <label htmlFor="newTaskTitle">
              New task
            </label>

            <input
              className="form-control"
              placeholder="Write your task"
              maxLength="30"
              id="newTaskTitle"
              type="text"
              name="newTask"
              value={taskTitle}
              onChange={handleTitle}
            />
          </div>

          <div className="form-group sizing">
            <label htmlFor="usersSelector">
              Registered users
            </label>

            <select
              className="form-control"
              id="usersSelector"
              value={selectedUser}
              onChange={selectUser}
            >
              <option value="">
                Choose a user
              </option>

              {props.users.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary rounded-pill mx-1"
          >
            +
          </button>

          <br />
          {error === 'title' && (
            <label
              htmlFor="newTaskTitle"
              className="text-danger"
            >
              Please enter the title
            </label>
          )}

          {error === 'user' && (
            <label
              htmlFor="usersSelector"
              className="text-danger"
            >
              Please choose a user
            </label>
          )}
        </form>

        <TodoList tasks={todos} />
      </>
    );
  }
}

AddTaskForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  todos: PropTypes.arrayOf(TodoShape),
};

AddTaskForm.defaultProps = {
  todos: [],
};
