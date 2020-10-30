import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { Form } from './Components/Form';
import { TodosList } from './Components/TodosList';

const preparedTodos = todos.map(todo => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  user: users.find(user => user.id === todo.userId).name,
}));

const preparedUsers = users.map(user => user.name);

class App extends React.PureComponent {
  state = {
    todosList: preparedTodos,
  };

  addTodo = (selectedUser, enteredTodo) => {
    if (enteredTodo !== ''
      && selectedUser !== 'Choose a user') {
      const newTodo = {
        id: this.state.todosList.length + 1,
        title: enteredTodo,
        completed: false,
        user: selectedUser,
      };

      this.setState(state => ({
        todosList: [...state.todosList, newTodo],
      }));
    }
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Add todo form</h1>
        <Form
          addTodo={this.addTodo}
          preparedUsers={preparedUsers}
        />
        <TodosList todosList={todosList} />
      </div>
    );
  }
}

export default App;
