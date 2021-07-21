import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
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
    this.setState(state => ({
      todos: [...state.todos, {
        id: state.todos.length + 1,
        ...todo,
      }],
    }));
  }

  render() {
    const visibleTodos = this.state.todos;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoList todos={visibleTodos} />
        <TodoForm
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
