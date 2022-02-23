import React from 'react';
import 'bulma/css/bulma.min.css';

import users from './api/users';
import todos from './api/todos';

import { TodosList } from './components/TodosList';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

type State = {
  todos: PreparedTodo[];
};

class App extends React.Component<{}, State> {
  state = {
    todos: [...preparedTodos],
  };

  addTodo = (newTodo: PreparedTodo) => {
    this.setState((state) => ({
      todos: [...state.todos, newTodo],
    }));
  };

  render() {
    return (
      <div className="p-5">
        <AddTodoForm todos={this.state.todos} addTodo={this.addTodo} />
        <TodosList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
