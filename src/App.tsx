import React from 'react';
import './App.css';

import AllTodos from './api/todos';
import { TodosList } from './components/TodosList';
import { getUserById } from './helpers';
import { AddTodoForm } from './components/AddTodoForm';

export const todosWithUser: TodoWithUser[] = AllTodos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type State = {
  todos: TodoWithUser[],
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todosWithUser],
  };

  addNewTodo = (newTodo: TodoWithUser) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App card">
        <h1 className="title is-3 has-text-primary">Add todo form</h1>

        <AddTodoForm todo={todos} addNewTodo={this.addNewTodo} />
        <TodosList todos={todos} />
      </div>
    );
  }
}
export default App;
