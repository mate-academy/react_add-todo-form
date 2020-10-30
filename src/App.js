import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

class App extends PureComponent {
  state = {
    todos: todosFromServer,
    users: usersFromServer,
  }

  addTodo = (newTodoValues) => {
    this.setState((state) => {
      const newTodo = {
        ...newTodoValues,
        id: state.todos.length + 1,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  render() {
    const { todos, users } = this.state;

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    return (
      <div className="app">
        <h1 className="app__title">List of todos</h1>
        <Form
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todoList={preparedTodos} />
      </div>
    );
  }
}

export default App;
