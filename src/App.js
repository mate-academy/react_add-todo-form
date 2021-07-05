import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends Component {
  state = {
    todos: [],
  }

  addTodo = (title, name) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          userId: users.find(user => user.name === name).id,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ],
    }));
  }

  setItemCompleted = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo)),
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <hr />
        <TodoList
          todos={this.state.todos}
          setItemCompleted={this.setItemCompleted}
        />
      </div>
    );
  }
}

export default App;
