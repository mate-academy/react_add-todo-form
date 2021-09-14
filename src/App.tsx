import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './Components/TodoList/Todolist';
import { TodoForm } from './Components/TodoForm/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const preparedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  id: uuidv4(),
  user: usersFromServer.find((user) => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
}

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
        <h1>List of todos </h1>
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
