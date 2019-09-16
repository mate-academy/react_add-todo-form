import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfUsers: [...users],
      listOfTodos: [...todos],
      selectedUser: 0,
      inputValue: '',
      showErrorInput: false,
      showErrorSelect: false,
    };
  }

  handleInputChange = (value) => {
    this.setState({
      inputValue: value.replace(/[^\w\s]|^\s/g, ''),
      showErrorInput: false,
    });
  }

  changeSelectedUser = (value) => {
    this.setState({
      selectedUser: value,
      showErrorSelect: false,
    });
  }

  addTodo = () => {
    this.setState(prevState => (
      prevState.inputValue && prevState.selectedUser !== 0
        ? {
          inputValue: '',
          selectedUser: 0,
          listOfTodos: [
            ...prevState.listOfTodos,
            {
              userId: prevState.selectedUser,
              id: prevState.listOfTodos.length,
              title: prevState.inputValue,
              completed: false,
            },
          ],
        }
        : !prevState.inputValue && prevState.selectedUser === 0
          ? {
            showErrorInput: true,
            showErrorSelect: true,
          }
          : !prevState.inputValue
            ? {
              showErrorInput: true,
            }
            : {
              showErrorSelect: true,
            }
    ));
  }

  render() {
    const {
      handleInputChange,
      changeSelectedUser,
      addTodo,
      state: {
        listOfUsers,
        listOfTodos,
        selectedUser,
        inputValue,
        showErrorInput,
        showErrorSelect,
      },
    } = this;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <AddTodo
          inputValue={inputValue}
          listOfUsers={listOfUsers}
          handleInputChange={handleInputChange}
          selectedUser={selectedUser}
          changeSelectedUser={changeSelectedUser}
          addTodo={addTodo}
          showErrorInput={showErrorInput}
          showErrorSelect={showErrorSelect}
        />
        <TodoList listOfTodos={listOfTodos} />
      </div>
    );
  }
}

export default App;
