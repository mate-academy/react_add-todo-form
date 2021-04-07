import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoForm } from './components/TodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    initialUsers: [...users],
    usersTodos: [...preparedTodos],
  }

  render() {
    const { usersTodos, initialUsers } = this.state;

    return (
      <div className="App">
        <h1 className="title is-2">Add todo form</h1>

        <TodoForm
          usersTodos={usersTodos}
          initialUsers={initialUsers}
        />
      </div>
    );
  }
}

export default App;
