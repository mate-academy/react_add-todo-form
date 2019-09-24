import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import todos from './api/todos';
import NewTodo from './components/NewTodo/NewTodo';
import users from './api/users';

import './App.css';

class App extends Component {
  state = {
    todosData: [...todos],
    usersData: [...users],
  };

  getTodosWithUsers = (todosList, usersList) => todosList
    .map(todo => ({
      ...todo,
      user: usersList.find(user => user.id === todo.userId),
    }));

  addTodo = (text, userId) => {
    const newTodo = this.createTodoItem(text, userId);

    this.setState(prevState => ({
      todosData: [...prevState.todosData, newTodo],
    }));
  };

  createTodoItem(value, userId) {
    return {
      title: value,
      completed: false,
      userId: Number(userId),
      id: this.state.todosData.length + 1,
    };
  }

  render() {
    const { todosData, usersData } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos with add todo form</h1>
        <p>
          <span>Todos: </span>
          {todosData.length}
        </p>
        <p>
          <span>Users: </span>
          {usersData.length}
        </p>
        <NewTodo users={usersData} onItemAdded={this.addTodo} />
        <TodoList todos={this.getTodosWithUsers(todosData, usersData)} />
      </div>
    );
  }
}

export default App;
