import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './TodoList';
import { Form } from './Form';

type State = {
  todos: Todo[];
};

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    this.setState((currentState) => ({
      todos: [...currentState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <Form
          users={users}
          todos={todos}
          addTodo={this.addTodo}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
