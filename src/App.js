import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

class App extends PureComponent {
  users = usersFromServer;

  state = {
    todos: todosFromServer,
  }

  addTodo = (title, userId) => {
    this.setState((state) => {
      const newTodo = {
        userId,
        id: state.todos.length + 1,
        title,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  render() {
    const { todos } = this.state;

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: this.users.find(user => user.id === todo.userId),
    }));

    return (
      <div className="app">
        <h1 className="app__title">List of todos</h1>
        <Form
          users={this.users}
          addTodo={this.addTodo}
        />
        <TodoList todoList={preparedTodos} />
      </div>
    );
  }
}

export default App;
