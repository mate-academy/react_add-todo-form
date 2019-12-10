import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    users: [...users],
    todoList: [...todos],
    newText: '',
    newUser: 0,
    error: '',
  }

  maxTextLen = 25;

  handleNewText = (event) => {
    if (event.target.value.length >= this.maxTextLen) {
      this.setState({ newText: event.target.value.slice(0, this.maxTextLen) });
    } else {
      this.setState({ newText: event.target.value });
    }
  }

  handleNewUser = (event) => {
    this.setState({ newUser: event.target.value });
  }

  setNewTodo = (event) => {
    event.preventDefault();

    if (!this.state.newText) {
      this.setState({ error: 'Please enter the title' });
    } else if (!this.state.newUser) {
      this.setState({ error: 'Please choose a user' });
    } else {
      this.setState(state => ({
        todoList: [...state.todoList, {
          title: state.newText,
          id: state.todoList.length + 1,
          userId: +state.newUser,
        }],
        newText: '',
        error: '',
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <form onSubmit={this.setNewTodo}>
          <TodoList
            todoList={this.state.todoList}
            users={this.state.users}
          />
          <NewTodo
            users={this.state.users}
            newText={this.state.newText}
            error={this.state.error}
            newUser={this.state.newUser}
            handleText={this.handleNewText}
            setUser={this.handleNewUser}
          />
        </form>
      </div>
    );
  }
}

export default App;
