import React from 'react';
import './App.css';

import initialTodos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const preparedTodos = initialTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
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
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo</h1>
        <TodoForm
          addTodo={this.addTodo}
          todoLength={todos.length}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
