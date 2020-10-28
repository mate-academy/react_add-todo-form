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

  addTodo = (title, userId) => {
    this.setState(state => ({
      todos: [...state.todos, {
        userId,
        id: state.todos.length + 1,
        title,
        completed: false,
      }],
    }));
  }

  render() {
    const { users, todos } = this.state;

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
