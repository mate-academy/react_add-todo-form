import * as React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type State = {
  todos: PrepearedTodo[];
};

const prepearedTodos: PrepearedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => todo.id === user.id) as User || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...prepearedTodos],
  };

  addTodo = (todo: PrepearedTodo) => {
    this.setState((state) => ({
      todos: [...state.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoList todoList={this.state.todos} users={usersFromServer} addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
