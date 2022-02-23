import React from 'react';
import './App.css';

import todos from './api/todos';
import { getUserById } from './helpers';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

import { TodoList } from './components/TodoList/TodoList';

const todosWithUsers: TodoWithUser[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type Props = {};
type State = {
  todos: TodoWithUser[];
};

export class App extends React.Component<Props, State> {
  state: State = {
    todos: [...todosWithUsers],
  };

  addNewTodo = (newTodo: TodoWithUser) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    return (
      <div>
        <h1>Add good form</h1>
        <AddTodoForm todos={this.state.todos} addNewTodo={this.addNewTodo} />
        <h1>Static list of todos</h1>
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
