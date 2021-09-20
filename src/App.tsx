import React from 'react';
import './App.css';
import { uuid } from 'uuidv4';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const findUserById = (userId: number) => {
  return users.find((user) => user.id === userId) || null;
};

const todosWithUsers: Todo[] = todos.map((todo) => ({
  ...todo,
  uuid: uuid(),
  user: findUserById(todo.userId),
}));

interface State {
  todos: Todo[];
  usersList: User[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: todosWithUsers,
    usersList: users,
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
        <h1>Add Todo</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={this.state.todos}
          users={this.state.usersList}
        />
      </div>
    );
  }
}
