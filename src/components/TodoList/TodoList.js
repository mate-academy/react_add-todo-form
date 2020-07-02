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
    titleOfTask: '',
    userId: '',
    isValid: false,
  }

  getTask = (e) => {
    const task = e.target.value.replace(/\d/g, '');

    this.setState({
      titleOfTask: task,
      isValid: false,
    });
  }

  getCurrentUser = (e) => {
    const id = e.target.value;

    this.setState({
      userId: id,
      isValid: false,
    });
  }

  setTask = (e) => {
    e.preventDefault();

    if (!this.state.titleOfTask || !this.state.userId) {
      this.setState({
        isValid: true,
      });

      return;
    }

    e.target.reset();

    const newTask = {
      userId: this.state.userId,
      id: this.state.todosList.length + 1,
      title: this.state.titleOfTask,
      completed: false,
    };

    this.setState((prevState) => {
      prevState.todosList.push(newTask);

      return {
        todosList: prevState.todosList,
        titleOfTask: '',
        userId: '',
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
      titleOfTask,
      isValid,
      isErrorUser,
    } = this.state;

    let errorMessage;

    if (!this.state.titleOfTask && !this.state.userId) {
      errorMessage = 'Please type correct data';
    } else if (!this.state.titleOfTask && this.state.userId) {
      errorMessage = 'Please enter the title';
    } else if (this.state.titleOfTask && !this.state.userId) {
      errorMessage = 'Please choose a user';
    }

    return (
      <div className="wrapper">
        <form
          className="form"
          onSubmit={this.setTask}
        >
          <label className="title-input">
            {isValid
              ? (
                <span className="error">
                  {errorMessage}
                </span>
              )
              : ''}
            <input
              className="form-control-lg"
              type="text"
              placeholder="Type task here"
              onChange={this.getTask}
              value={titleOfTask}
              maxLength="30"
            />
          </label>
          <UserSelect
            users={this.props.users}
            onChangeUser={this.getCurrentUser}
            onUserError={isErrorUser}
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
