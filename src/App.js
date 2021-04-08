import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';

const personTodos = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }
));

export class App extends React.Component {
  state = {
    todos: personTodos,
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm todos={todos} />
      </div>
    );
  }
}
