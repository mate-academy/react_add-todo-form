import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { AddToDo } from './components/AddToDo';
import { ToDoList } from './components/ToDoList';

import 'semantic-ui-css/semantic.min.css';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addToDo = (title, user) => {
    this.setState((prevState) => {
      const newToDo = {
        title,
        user,
        userId: user.id,
        id: prevState.todos.length + 1,
        completed: false,
      };

      return {
        todos: [
          ...prevState.todos,
          newToDo,
        ],
      };
    });
  }

  render() {
    return (
      <main className="app">
        <AddToDo users={users} addToDo={this.addToDo} />
        <ToDoList todos={this.state.todos} />
      </main>
    );
  }
}

export default App;
