import React, { Component } from 'react';
import './App.css';
import usersApi from './api/users';
import todosApi from './api/todos';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';

class App extends Component {
  state = {
    users: [...usersApi],
    todos: [...todosApi],
  }

  addTodo = (titleValue, selectedUserValue) => {
    this.setState(({ todos, title, selectedUser }) => ({
      todos: [
        ...todos,
        {
          userId: selectedUserValue,
          id: todos.length + 1,
          title: titleValue,
          completed: false,
        },
      ],
    }));
  }

  render() {
    const { users, todos } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <AddTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
