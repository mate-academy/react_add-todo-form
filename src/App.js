import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

export default class App extends Component {
  state = {
    listOfTodo: todos.map(todo => (
      {
        ...todo,
        user: users.find(item => item.id === todo.userId),
      })),
  };

  onNewTodoAdd = ({ userId, title }) => {
    this.setState(prevState => ({
      listOfTodo: [
        ...prevState.listOfTodo,
        {
          userId,
          id: prevState.listOfTodo.length + 1,
          title,
          completed: false,
          user: users.find(item => item.id === userId),
        },
      ],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>List of todos with form</h1>

        <NewTodo onAdd={this.onNewTodoAdd} />
        <TodoList listOfTodo={this.state.listOfTodo} />
      </div>
    );
  }
}
