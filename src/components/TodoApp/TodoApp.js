import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoList from '../TodoList/TodoList';
import NewTodo from '../NewTodo/NewTodo';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [...this.props.users],
      todos: [...this.props.todos],
      todoTitleValue: '',
      todoUserId: -1,
      currentId: 3,
      selectError: null,
      inputError: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.todoTitleValue.trim() === '') {
      this.setState({ inputError: 'Please enter the title' });

      return;
    }

    if (this.state.todoUserId === -1) {
      this.setState({ selectError: 'Please choose a user' });

      return;
    }

    if (this.state.inputError === null && this.state.selectError === null) {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.currentId,
            title: prevState.todoTitleValue,
            userId: prevState.todoUserId,
            completed: false,
          },
        ],
        currentId: prevState.currentId + 1,
        todoTitleValue: '',
        todoUserId: -1,
      }
      ));
    }
  };

  handleInputChange = (todoTitleValue) => {
    this.setState({ todoTitleValue, inputError: null });
  };

  handleSelectChange = (todoUserId) => {
    this.setState({ todoUserId: +todoUserId, selectError: null });
  };

  render() {
    const todosWithUsers = getTodosWithUsers(
      this.state.todos,
      this.state.users
    );

    return (
      <>
        <TodoList todos={todosWithUsers} />
        <NewTodo
          users={this.state.users}
          handleSubmit={this.handleSubmit}
          handleInputChange={(e) => {
            this.handleInputChange(e.target.value);
          }}
          inputValue={this.state.todoTitleValue}
          inputError={this.state.inputError}
          handleSelectChange={(e) => {
            this.handleSelectChange(e.target.value);
          }}
          selectValue={this.state.todoUserId}
          selectError={this.state.selectError}
        />
      </>
    );
  }
}

TodoApp.defaultProps = {
  users: [],
  todos: [],
};

TodoApp.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
};

export default TodoApp;
