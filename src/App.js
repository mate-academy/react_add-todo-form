import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.PureComponent {
  state = {
    todosList: preparedTodos,
  }

  addTodo = (newUser, title) => {
    const selectedUser = users.find(user => user.name === newUser);
    const newTodo = {
      title,
      user: selectedUser,
      userId: selectedUser.id,
      id: this.state.todosList.length + 1,
      completed: false,
    };

    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <Form users={users} addTodo={this.addTodo} />
        <h1>List of todos</h1>
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
