import React from 'react';

import users from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm';

import './App.css';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (newTodoTitle, user) => {
    this.setState((state) => {
      const newTodo = {
        userId: user.id,
        id: state.todos.length + 1,
        title: newTodoTitle,
        completed: false,
        user,
      };

      return { todos: [...state.todos, newTodo] };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App container">
        <h1 className="app__title">Add todo form</h1>

        <NewTodoForm
          users={users}
          onAdd={this.addTodo}
        />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
