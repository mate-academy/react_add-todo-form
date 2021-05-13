import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoList: todos,
    userList: users.map(user => ({
      id: user.id,
      name: user.name,
    })),
  };

  handleChange = (e) => {
    const { name, checked } = e.target;

    this.setState(state => ({
      todoList: state.todoList.map(todo => ({
        ...todo,
        completed: name === `${todo.id}` ? checked : todo.completed,
      })),
    }));
  };

  addTodo = (userId, title) => {
    this.setState((state) => {
      const newTodo = {
        id: state.todoList.length + 1,
        title,
        userId: +userId,
        completed: false,
      };

      return {
        todoList: [
          ...state.todoList,
          newTodo,
        ],
      };
    });
  };

  render() {
    const { todoList, userList } = this.state;

    return (
      <div className="App">
        <div className="container">
          <TodoList
            users={userList}
            todos={todoList}
            onChange={this.handleChange}
          />
          <TodoForm
            users={userList}
            onAdd={this.addTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
