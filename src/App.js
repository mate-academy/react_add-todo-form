import React from 'react';
import './App.css';
import Input from './Input';
import Select from './Select';
import ToDoList from './ToDoList';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(todosArr, usersArr) {
  return todosArr.map(todo => (
    {
      ...todo,
      user: { ...usersArr.find(user => user.id === todo.userId) },
    }
  ));
}

class App extends React.Component {
  state = {
    newTodos: [...todos],
    inputValue: '',
    userId: null,
    id: 2,
    defaultOption: 0,
    selectEmpty: true,
    selectError: false,
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectEmpty) {
      this.setState({ selectError: true });
    } else {
      this.setState(state => ({
        newTodos: [...state.newTodos, {
          userId: +state.userId,
          id: state.id + 1,
          title: state.inputValue,
        }],
        inputValue: '',
        defaultOption: 0,
        userId: null,
        selectEmpty: true,
      }));
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      userId: event.target.value,
      defaultOption: event.target.value,
      selectEmpty: false,
      selectError: false,
    });
  }

  render() {
    const { newTodos, inputValue, defaultOption, selectError } = this.state;

    return (
      <>
        <h1>To Do List</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            inputValue={inputValue}
            handleInputChange={this.handleInputChange}
          />
          <Select
            defaultOption={defaultOption}
            handleSelectChange={this.handleSelectChange}
            users={users}
            error={selectError}
          />
          <button type="submit">Add</button>
        </form>
        <ToDoList todos={getTodosWithUsers(newTodos, users)} />
      </>
    );
  }
}

export default App;
