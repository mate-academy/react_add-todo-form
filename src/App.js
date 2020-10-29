import React, { PureComponent } from 'react';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';

import './App.scss';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends PureComponent {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (user, title) => {
    const { todos } = this.state;

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      user,
      userId: user.id,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;
    const { addTodo } = this;

    return (
      <div className="App">
        <Form users={usersFromApi} addTodo={addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
