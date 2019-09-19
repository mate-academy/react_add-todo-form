import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

const getUser = userId => users.find(user => user.id === userId);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

class App extends Component {
  state = {
    todos: [...preparedTodos],
  };

  handleAddTodo = ({ title, userId }) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId: +userId,
          id: prevState.todos.length + 1,
          title,
          completed: false,
          user: users.find(user => user.id === +userId),
        },
      ],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="title">Static list of todos</h1>
        <NewTodo users={users} addTodo={this.handleAddTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
