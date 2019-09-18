import React, { Component } from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

function todosWithUser(listTasks, listUsers) {
  return listTasks.map(item => (
    { ...item, user: listUsers.find(person => person.id === item.userId) }));
}

const fullList = todosWithUser(todos, users);

class App extends Component {
  state = {
    listOfTodos: [...fullList],
    listOfUsers: [...users],
  }

  addNewTodo = (userId, title) => {
    this.setState((prevState) => {
      const newItem = {
        userId,
        id: prevState.listOfTodos.length + 1,
        title,
        completed: false,
        user: prevState.listOfUsers.find(person => person.id === userId),
      };

      return (
        {
          listOfTodos: [...prevState.listOfTodos, newItem],
        }
      );
    });
  }

  render() {
    const { listOfTodos, listOfUsers } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {listOfTodos.length}
        </p>
        <TodoList
          todos={listOfTodos}
          users={listOfUsers}
          addNewTodo={this.addNewTodo}
        />
        <p>
          <span>Users: </span>
          {listOfUsers.length}
        </p>
      </div>
    );
  }
}

export default App;
