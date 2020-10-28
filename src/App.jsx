import React from 'react';
import './app.scss';

import users from './api/users';
import todos from './api/todos';
import { ToDoList } from './components/ToDoList/ToDoList';
import { AddToDo } from './components/AddToDo/AddToDo';

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
