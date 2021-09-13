import React from 'react';
import { TodoForm } from './Components/TodoForm';
import { TodoTable } from './Components/TodoTable';
import { Todo } from './react-app-env';
import './App.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
})) as Todo[];

type State = {
  todos: Todo[],
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
    };

    this.setState((currentState) => ({
      todos: [
        ...currentState.todos,
        newTodo,
      ],
    }));
  };

  render() {
    const { todos: userTodos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoForm addTodo={this.addTodo} />

        <TodoTable todos={userTodos} />
      </div>
    );
  }
}

export default App;
