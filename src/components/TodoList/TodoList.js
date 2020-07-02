import React from 'react';
import PropTypes from 'prop-types';

import { Todos } from '../PreparedTodos/PreparedTodos';
import { NewTodo } from '../NewTodo/NewTodo';
import { UserShapes, TodoShapes } from '../../Shapes';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
  }

  onChangeInput = (todoTitle) => {
    this.setState({
      todoTitle,
      isInputEmpty: false,
    });
  }

  onChangeSelect = (userId) => {
    this.setState({
      userId,
      isUserChoosed: false,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.todoTitle) {
      this.setState({
        isInputEmpty: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        isUserChoosed: true,
      });

      return;
    }

    const newTask = {
      userId: +this.state.userId,
      id: this.state.todos.length + 1,
      title: this.state.todoTitle,
      completed: false,
    };

    this.setState({
      todoTitle: '',
      userId: 0,
    });

    this.setState(prevState => prevState.todos.push(newTask));

    event.target.reset();
  }

  render() {
    return (
      <>
        <div className="main">
          <Todos todos={this.state.todos} />
          <div className="sidebar">
            <NewTodo
              onFormSubmit={this.onFormSubmit}
              onChangeInput={this.onChangeInput}
              onChangeSelect={this.onChangeSelect}
              users={this.props.users}
              isInputEmpty={this.state.isInputEmpty}
              isUserChoosed={this.state.isUserChoosed}
            />
          </div>
        </div>
      </>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(UserShapes).isRequired,
  todos: PropTypes.arrayOf(TodoShapes).isRequired,
};
