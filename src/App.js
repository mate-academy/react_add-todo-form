import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

export default class App extends Component {
  state = {
    todos,
  };

  onNewTodoAdd = ({ userId, title }) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId,
          id: prevState.todos.length + 1,
          title,
          completed: false,
        },
      ],
    }));
  };

  render() {
    const { state, onNewTodoAdd } = this;

    return (
      <div className="App">
        <h1>List of todos with form</h1>

        <NewTodo onAdd={onNewTodoAdd} />
        <TodoList listOfTodo={state.todos.map(todo => (
          {
            ...todo,
            user: users.find(item => item.id === todo.userId),
          }))}
        />
      </div>
    );
  }
}
