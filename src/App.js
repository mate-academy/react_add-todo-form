import React from 'react';
import './App.css';
import { TodoList } from './component/TodoList/TodoList';
import { NewTodo } from './component/NewTodo/NewTodo';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map((todo) => {
  const current = { ...todo };

  current.user = users.find(user => user.id === todo.userId);

  return current;
});

class App extends React.Component {
  state = {
    finalTodos: [...preparedTodos],
    id: preparedTodos[preparedTodos.length - 1].id + 1,
  }

  handleSubmit = (newTodo) => {
    this.setState(state => ({
      finalTodos: [...state.finalTodos, { ...newTodo }],
    }));
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Static list of todos</h1>
          <p>
            <span>Todos: </span>
            {this.state.finalTodos.length}
          </p>
        </div>
        <NewTodo
          onSubmit={this.handleSubmit}
          id={this.state.id}
          users={users}
        />
        <div className="list">
          <TodoList list={this.state.finalTodos} />
        </div>
      </>
    );
  }
}

export default App;
