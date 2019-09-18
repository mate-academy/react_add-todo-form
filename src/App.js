import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';

class App extends Component {
  state = {
    listOfUsers: [...users],
    listOfTodos: [...todos],
    title: {
      value: '',
      showError: false,
    },
    selectedUser: {
      value: 0,
      showError: false,
    },
  }

  handleInputChange = ({ name, value }) => {
    this.setState({
      [name]: {
        value: value.replace(/[^\w\s]|^\s/g, ''),
        showError: false,
      },
    });
  }

  addTodo = () => {
    this.setState(({ listOfTodos, title, selectedUser }) => (
      (title.value && selectedUser.value)
        ? {
          listOfTodos: [...listOfTodos, {
            userId: selectedUser.value,
            id: listOfTodos.length + 1,
            title: title.value,
            completed: false,
          }],
          title: {
            value: '',
            showError: false,
          },
          selectedUser: {
            value: 0,
            showError: false,
          },
        }
        : {
          title: {
            value: title.value,
            showError: !title.value,
          },
          selectedUser: {
            value: selectedUser.value,
            showError: !selectedUser.value,
          },
        }
    ));
  }

  render() {
    const {
      listOfUsers,
      listOfTodos,
      title,
      selectedUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <AddTodo
          addTodo={this.addTodo}
          handleInputChange={this.handleInputChange}
          listOfUsers={listOfUsers}
          title={title}
          selectedUser={selectedUser}
        />
        <TodoList listOfTodos={listOfTodos} />
      </div>
    );
  }
}

export default App;
