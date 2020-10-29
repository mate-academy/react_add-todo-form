import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { prepareTodos } from './helpers/prepareTodos';

class App extends React.PureComponent {
  users = usersFromServer;

  state = {
    todos: prepareTodos,
    lastId: prepareTodos.length,
  }

  addTodo = (user, title) => {
    const newTodo = {
      userId: user.id,
      id: this.state.lastId + 1,
      title,
      completed: false,
      user,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      lastId: state.lastId + 1,
    }));
  }

  render() {
    const {
      state: { todos },
      users,
      addTodo,
    } = this;

    return (
      <div className="App">
        <Form users={users} addTodo={addTodo} />

        <TodoList {...todos} />
      </div>
    );
  }
}

export default App;
