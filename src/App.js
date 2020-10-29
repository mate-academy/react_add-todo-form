import React from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import users from './api/users';
import todos from './api/todos';
import { ToDoList } from './components/ToDoList';
import { NewToDoForm } from './components/NewToDoForm';

class App extends React.Component {
  state = {
    toDosList: todos,
  }

  addToDO = (title, userId) => {
    this.setState((state) => {
      const newTodo = {
        id: state.toDosList.length + 1,
        completed: false,
        title,
        userId,
      };

      return {
        toDosList: [...state.toDosList, newTodo],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="app-title">Add todo form</h1>
        <NewToDoForm
          onAdd={this.addToDO}
          users={users}
        />
        <ToDoList todos={this.state.toDosList} />
      </div>
    );
  }
}

export default App;
