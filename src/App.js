import React from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import users from './api/users';
import todos from './api/todos';
import { ToDoList } from './components/ToDoList';
import { NewToDoForm } from './components/NewToDoForm';

const preparedToDos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    toDosList: preparedToDos,
  }

  addToDO = (title, newUser) => {
    this.setState((state) => {
      const newTodo = {
        id: state.toDosList.length + 1,
        completed: false,
        title,
        userId: newUser.id,
        user: newUser,
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
        <ToDoList
          todos={this.state.toDosList}
        />
      </div>
    );
  }
}

export default App;
