import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

const getUserById = userId => (
  usersFromServer.find(user => user.id === userId)
);

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (newTodoTitle, selectedUserId) => {
    this.setState(({ todos }) => {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      return {
        todos: [newTodo, ...todos],
      };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <Form addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
