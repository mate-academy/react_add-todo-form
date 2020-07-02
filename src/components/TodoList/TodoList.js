import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import todos from '../../api/todos';
import { UserSelect } from '../UserSelect/UserSelect';
import { Button } from '../Button/Button';
import { NewTodo } from '../NewTodo/NewTodo';
import { UserTypes } from '../Shape/ShapeTypes';

export class TodoList extends React.Component {
  state = {
    todosList: [...todos],
    defaultSelect: 'Choose a user',
    currentTask: '',
    currentId: '',
    errorContent: false,
    errorUser: false,
  }

  getTask = (e) => {
    const task = e.target.value.replace(/\d/g, '');

    this.setState({
      currentTask: task,
      errorContent: false,
    });
  }

  getCurrentUser = (e) => {
    const id = e.target.value;

    this.setState({
      currentId: id,
      defaultSelect: id,
      errorUser: false,
    });
  }

  setTask = (e) => {
    e.preventDefault();

    if (!this.state.currentTask) {
      this.setState({
        errorContent: true,
      });

      return;
    }

    if (!this.state.currentId) {
      this.setState({
        errorUser: true,
      });

      return;
    }

    e.target.reset();

    const newTask = {
      userId: this.state.currentId,
      id: this.state.todosList.length + 1,
      title: this.state.currentTask,
      completed: false,
    };

    this.setState((prevState) => {
      prevState.todosList.push(newTask);

      return {
        todosList: prevState.todosList,
        currentTask: '',
        defaultSelect: 'Choose a user',
      };
    });
  }

  toggleCheck = (e) => {
    const id = e.target.value;

    this.setState((prevState) => {
      const current = prevState.todosList.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      return { todosList: current };
    });
  }

  render() {
    const {
      todosList,
      currentTask,
      defaultSelect,
      errorContent,
      errorUser,
    } = this.state;

    return (
      <div className="wrapper">
        <form
          onSubmit={this.setTask}
        >
          {errorContent
            ? (
              <h2 className="error">
                Please enter the title
              </h2>
            )
            : ''}
          <label>
            <input
              className={`${errorContent
                ? 'form-control form-control-lg input-error'
                : 'form-control form-control-lg'}`
              }
              type="text"
              placeholder="Type task here"
              onChange={this.getTask}
              value={currentTask}
              maxLength="30"
            />
          </label>
          <UserSelect
            users={this.props.users}
            value={defaultSelect}
            onChangeUser={this.getCurrentUser}
            onUserError={errorUser}
          />
          <Button />
        </form>
        <div>
          <NewTodo todoList={todosList} toggle={this.toggleCheck} />
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(
    UserTypes,
  ).isRequired,
};
