import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo/NewTodo';
import FormError from './Components/FormError/FormError';

const preparedToDos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedToDos: [...preparedToDos],
    usersList: [...users],
    formErrors: {
      user: '', task: '',
    },
    // tasklValid: false,
    // userValid: false,
    // formValid: false,
  }

  updateTodosList = (event, task, userName, taskStatus) => {
    event.preventDefault();
    this.setState(state => ({ preparedToDos: [...state.preparedToDos, {
      completed: taskStatus,
      id: state.preparedToDos.length + 1,
      title: task,
      userId: (users.find(user => userName === user.name)).id,
      user: {
        ...users.find(user => userName === user.name),
      },
    }] }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div>
          <FormError formErrors={this.state.formErrors} />
        </div>
        <NewTodo
          usersList={this.state.usersList}
          updateTodosList={this.updateTodosList}
        />
        <TodoList preparedToDos={this.state.preparedToDos} />
      </div>
    );
  }
}

export default App;
