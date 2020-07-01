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
    todos: [...todos],
    defaultSelect: 'Choose a user',
    currentTask: '',
    currentId: '',
  }

  getTask = (e) => {
    const task = e.target.value.replace(/\d/g, '');

    this.setState({
      currentTask: task,
    });
  }

  getCurrentUser = (e) => {
    const id = e.target.value;

    this.setState({
      currentId: id,
      defaultSelect: id,
    });
  }

  setTask = (e) => {
    e.preventDefault();
    if (!this.state.currentId) {
      alert('Please choose a user');

      return;
    }

    e.target.reset();

    const newTask = {
      userId: this.state.currentId,
      id: this.state.todos.length + 1,
      title: this.state.currentTask,
      completed: false,
    };

    this.setState((prevState) => {
      prevState.todos.push(newTask);

      return {
        todos: prevState.todos,
        currentTask: '',
      };
    });
  }

  toggleCheck = (e) => {
    const id = e.target.value;

    this.setState((prevState) => {
      const current = prevState.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      return { todos: current };
    });
  }

  render() {
    return (
      <div className="wrapper">
        <form
          onSubmit={this.setTask}
        >
          <label>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Type task here"
              onChange={this.getTask}
              value={this.state.currentTask}
              maxLength="30"
              required
            />
          </label>
          <UserSelect
            users={this.props.users}
            value={this.state.defaultSelect}
            onChangeUser={this.getCurrentUser}
          />
          <Button />
        </form>
        <div>
          <NewTodo todoList={this.state.todos} toggle={this.toggleCheck} />
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
