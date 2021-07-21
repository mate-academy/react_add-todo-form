import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodo } from './components/AddTodo/AddTodo';
import './App.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map((todo) => {
  const preparedTodo = { ...todo };
  const todoUser = users.find(user => user.id === todo.userId);

  preparedTodo.user = todoUser;

  return preparedTodo;
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo(todo) {
    this.setState((state) => {
      const newTodos = [...state.todos];

      newTodos.push(todo);
      newTodos[newTodos.length - 1].id = newTodos.length;

      return {
        todos: newTodos,
      };
    });
  }

  render() {
    const visibleTodos = this.state.todos;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoList todos={visibleTodos} />
        <AddTodo
          users={users}
          addTodo={(todo) => {
            this.addTodo(todo);
          }}
        />
      </div>
    );
  }
}

export default App;
