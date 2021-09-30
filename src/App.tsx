import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

type State = {
  todos: Todo[];
};

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form users={users} todos={this.state.todos} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
