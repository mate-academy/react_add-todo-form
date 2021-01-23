
import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { NewForm } from './components/NewForm';
import { ToDoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  addTodo = (title, newUser) => {
    this.setState((state) => {
      const newTodo = {
        id: state.todosList.length + 1,
        completed: false,
        title,
        userId: newUser.id,
        user: newUser,
      };

      return {
        todosList: [
          ...state.todosList,
          newTodo,
        ],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="app-title">Add todo form</h1>
        <NewForm
          onAdd={this.addTodo}
          users={users}
        />
        <ToDoList
          todos={this.state.todosList}
        />
      </div>
    );
  }
}

export default App;
