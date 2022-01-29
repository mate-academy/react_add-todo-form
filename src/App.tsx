import React from 'react';
import './App.css';

import todos from './api/todos';
import { TodosList } from './components/TodosList';
import { getUserById } from './helpers';
import { AddTodoForm } from './components/AddTodoForm';

export const todoWithUser: TodoWithUser[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type Props = {};
type State = {
  todo: TodoWithUser[],
};

export class App extends React.Component<Props, State> {
  state: State = {
    todo: [...todoWithUser],
  };

  addNewTodo = (newTodo: TodoWithUser) => {
    this.setState((prevState) => ({
      todo: [...prevState.todo, newTodo],
    }));
  };

  render() {
    const { todo } = this.state;

    return (
      <div className="App card">
        <h1 className="title is-3 has-text-primary">Add good form</h1>

        <AddTodoForm todo={todo} addNewTodo={this.addNewTodo} />
        <TodosList todos={todo} />
      </div>
    );
  }
}
export default App;
