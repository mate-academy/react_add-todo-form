import React, { Component } from 'react';
import './App.css';
import TodoList from './components/todoList/TodoList';
import NewTodo from './components/newTodo/NewTodo';

import users from './api/users';
import todosList from './api/todos';

function getTodosWitsUsers(todoList, userList) {
  return todoList.map(todo => ({
    ...todo,
    user: userList.find(user => user.id === todo.userId),
  }));
}

class App extends Component {
  state = {
    todos: getTodosWitsUsers(todosList, users),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <main>
        <NewTodo
          users={users}
          todos={todos}
          addTodo={this.addTodo}
        />
        <TodoList todos={todos} />
      </main>
    );
  }
}

export default App;
