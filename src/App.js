import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodo } from './components/AddTodo/AddTodo';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Todos: </span>
          {this.state.todos.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <AddTodo
          newTodoId={this.state.todos.length + 1}
          users={users}
          addTodo={this.addTodo}
        />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
