import React from 'react';
import './App.css';
import { uuid } from 'uuidv4';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  uuid: uuid(),
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
  users: User[];
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    users: usersFromServer,
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
        <h1>Add todo form</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={this.state.todos}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
