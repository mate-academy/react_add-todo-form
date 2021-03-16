import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import './App.css';

import users from './api/users';
import initialTodos from './api/todos';

function findUser(id) {
  return users.find(user => user.id === id);
}

const preparedTodos = initialTodos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  };

  addTodoToList = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">

        <h1 className="header">
          Add todo form
        </h1>

        <TodoForm
          users={users}
          addTodo={this.addTodoToList}
          newTodoId={Math.max(...todos.map(todo => todo.id)) + 1}
        />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
