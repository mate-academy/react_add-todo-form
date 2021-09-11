import React from 'react';
import { TodoForm } from './Components/TodoForm';
import { TodoTable } from './Components/TodoTable';
import { Todo } from './react-app-env';
import './App.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
})) as Todo[];

type AppState = {
  userTodos: Todo[],
};

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    userTodos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: this.state.userTodos.length + 1,
    };

    this.setState((currentState) => ({
      userTodos: [
        ...currentState.userTodos,
        newTodo,
      ],
    }));
  };

  render() {
    const { userTodos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoForm addTodo={this.addTodo} />

        <TodoTable userTodos={userTodos} />
      </div>
    );
  }
}

export default App;
