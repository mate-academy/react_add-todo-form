import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';

export const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

type Props = {};
type State = {
  allTodos: Todo[];
};

export class App extends React.Component<Props, State> {
  state: State = {
    allTodos: [...preparedTodos],
  };

  addNewTodo = (newTodo: Todo) => {
    this.setState((prevState) => ({
      allTodos: [...prevState.allTodos, newTodo],
    }));
  };

  render() {
    const { allTodos } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <NewTodoForm allTodos={allTodos} addNewTodo={this.addNewTodo} />

          <TodoList todos={allTodos} />
        </div>
      </div>
    );
  }
}
