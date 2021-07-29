import React from 'react';
import { TodosList } from './Components/TodosList';
import { FormTodos } from './Components/FormTodos';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparetTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparetTodos],
  };

  addTodos = (title, userId) => {
    const newTodo = {
      id: this.state.todos.length + 1,
      completed: false,
      title,
      userId,
      user: users.find(
        user => user.id === +userId,
      ),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    return (
      <section className="container">
        <h1 className="container__title">
          Add todo form
        </h1>

        <FormTodos
          addTodos={this.addTodos}
          users={users}
        />

        <TodosList todos={this.state.todos} />
      </section>
    );
  }
}

export default App;
