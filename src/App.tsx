import React from 'react';
import './App.css';
import { uuid } from 'uuidv4';

import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const findUserId = (userId: number) => {
  return users.find((user) => user.id === userId) || null;
};

const todosWithUser: Todo[] = todos.map((todo) => ({
  ...todo,
  uuid: uuid(),
  user: findUserId(todo.userId),
}));

interface State {
  todos: Todo[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: todosWithUser,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState) => {
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
          users={users}
        />
      </div>
    );
  }
}
