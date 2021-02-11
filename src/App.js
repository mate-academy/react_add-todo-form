import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          addTodo={this.addTodo}
          users={usersFromServer}
          lastId={todos[todos.length - 1].id}
        />
        <TodoList todos={todos} />
        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>
        <p>
          <span>Todos: </span>
          {todos.length}
        </p>
      </div>
    );
  }
}

export default App;
