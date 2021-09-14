import React from 'react';
import './App.css';
import { uuid } from 'uuidv4';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const todosWithUser: Todo[] = todos.map(todo => ({
  ...todo,
  uuid: uuid(),
  user: users.find(user => user.id === todo.id) || null,
}));

interface State {
  users: User[],
  todos: Todo[],
}

export class App extends React.Component<{}, State> {
  state: State = {
    users,
    todos: todosWithUser,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState: State) => {
      return {
        todos: [...currentState.todos, newTodo],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={this.state.todos}
          users={this.state.users}
        />
      </div>
    );
  }
}
