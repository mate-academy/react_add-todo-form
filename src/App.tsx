import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: PreparedTodo[],
};

export class App extends React.PureComponent<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (newTodo: PreparedTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <>
        <AddTodoForm addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </>
    );
  }
}
