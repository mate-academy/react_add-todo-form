import React from 'react';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';

import './App.css';

import fullTodos from './api/todos';
import users from './api/users';

const preparedTodos = fullTodos.map(
  todo => ({
    ...todo,
    user: users.find(({ id }) => id === todo.userId),
  }),
);

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, userId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        userId: Number(userId),
        id: prevState.todos.length + 1,
        title,
        completed: false,
        user: users.find(({ id }) => id === Number(userId)),
      }],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo</h1>
        <TodoForm
          users={users}
          onAddTodo={this.addTodo}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
