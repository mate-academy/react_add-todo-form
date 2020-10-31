import React from 'react';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

import './App.css';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    visibletodos: preparedTodos,
  }

  addTodo = (newTodoTitle, user) => {
    this.setState((state) => {
      const newTodo = {
        userId: user.id,
        id: state.visibletodos.length + 1,
        title: newTodoTitle,
        completed: false,
        user,
      };

      return { visibletodos: [...state.visibletodos, newTodo] };
    });
  }

  render() {
    const { visibletodos } = this.state;

    return (
      <div className="App container">
        <h1 className="app__title">Add todo form</h1>

        <AddTodoForm
          users={users}
          addTodo={this.addTodo}
        />

        <TodoList todos={visibletodos} />
      </div>
    );
  }
}

export default App;
