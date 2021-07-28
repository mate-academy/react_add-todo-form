import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Form } from './components/Form';

const preparedTodos = todos.map(
  (todo) => {
    const user = users.find(
      person => person.id === todo.userId,
    );

    return {
      ...todo,
      user,
    };
  },
);

class App extends React.Component {
  state = {
    todos: preparedTodos,
    users: [...users],
    maxIndex: todos.reduce((a, b) => Math.max(a.id, b.id)),
  }

  addTodo = (title, userId) => {
    const { maxIndex, users } = this.state;
    const newTodo = {
      user: users.find(user => user.id === parseInt(userId)),
      id: maxIndex + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      maxIndex: state.maxIndex + 1,
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <div className="App">
        <h1>ToDo</h1>

        <Form users={users} addTodo={this.addTodo} />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
