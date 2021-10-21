import React from 'react';
import './App.css';
// import { type } from 'os';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Todo } from './types';

interface State {
  todos: Todo[],
}

const preparedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer.find((user) => user.id === todo.userId) || null,
}));

export class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (newTodo: Todo) => {
    this.setState(currentState => ({
      todos: [...currentState.todos, newTodo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm
          addTodo={this.addTodo}
          users={usersFromServer}
          todos={this.state.todos}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
