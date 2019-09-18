import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import todos from './api/todos';
import NewTodo from './components/NewTodo/NewTodo';
import users from './api/users';

import './App.css';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

class App extends Component {
  maxId = 2;

  state = {
    todosData: [...todos],
    usersData: [...users],
  };

  addTodo = (text, userId) => {
    if (text === '' || text === ' ') {
      return;
    }

    const newTodo = this.createTodoItem(text, userId);

    this.setState(prevState => ({
      todosData: [...prevState.todosData, newTodo],
    }));
  }

  createTodoItem(value, userId) {
    return {
      title: value,
      completed: false,
      userId: Number(userId),
      id: this.maxId += 1,
    };
  }

  render() {
    const { todosData, usersData } = this.state;
    const preparedTodos = getTodosWithUsers(todosData, usersData);

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
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
