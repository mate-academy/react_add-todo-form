import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todoList from './api/todos';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

class App extends Component {
  state = {
    todoList: [...todoList]
      .sort((a, b) => b.id - a.id)
      .map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          ...newTodo,
          id: state.todoList[0].id + 1,
          user: users.find(user => user.id === newTodo.userId),
        },
      ]
        .sort((a, b) => b.id - a.id),
    }));
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id),
    }));
  }

  statusToggle = (id) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList
          todoList={this.state.todoList}
          deleteTodo={this.deleteTodo}
          statusToggle={this.statusToggle}
        />
      </div>
    );
  }
}

export default App;
