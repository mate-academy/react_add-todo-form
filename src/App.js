import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const findUserById = userId => (
  users.find(user => user.id === userId)
);

const preparedTodoList = todos.map(todosItem => ({
  ...todosItem,
  user: findUserById(todosItem.userId),
}));

export class App extends React.Component {
  state = {
    todoList: preparedTodoList,
    newTodoText: '',
    selectedUserId: 0,
    hasTextError: false,
    hasUserError: false,
  };

  handleInputChange = (event) => {
    this.setState({
      hasTextError: false,
      newTodoText: event.target.value,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      hasUserError: false,
      selectedUserId: +event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoText, selectedUserId } = this.state;

    if (!selectedUserId || !newTodoText) {
      this.setState({
        hasUserError: !selectedUserId,
        hasTextError: !newTodoText,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        title: state.newTodoText,
        user: findUserById(state.selectedUserId),
        completed: false,
        id: state.todoList[state.todoList.length - 1].id + 1,
      };

      return {
        todoList: [...state.todoList, newTodo],
        selectedUserId: 0,
        newTodoText: '',
      };
    });
  }

  render() {
    const {
      todoList,
      newTodoText,
      selectedUserId,
      hasTextError,
      hasUserError,
    } = this.state;

    return (
      <>
        <NewTodo
          users={users}
          newTodoText={newTodoText}
          selectedUserId={selectedUserId}
          handleInputChange={this.handleInputChange}
          handleSelectChange={this.handleSelectChange}
          handleFormSubmit={this.handleFormSubmit}
          hasTextError={hasTextError}
          hasUserError={hasUserError}
        />
        <div className="todos-container">
          <TodoList todoList={todoList} />
        </div>
      </>
    );
  }
}
