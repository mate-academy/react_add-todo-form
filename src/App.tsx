import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const todosWithUser: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[],
  users: User[],
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todosWithUser],
    users,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState:State) => {
      return {
        todos: [...currentState.todos, newTodo],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <TodoList
          addTodo={this.addTodo}
          todos={this.state.todos}
          users={this.state.users}
        />
      </div>
    );
  }
}
