import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    this.setState(currentState => ({
      todos: [...currentState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoList
          todos={this.state.todos}
          addTodo={this.addTodo}
          users={users}
        />
      </div>
    );
  }
}

export default App;
