import React from 'react';

import { AddTodoForm } from './components/addTodoForm';
import { TodoList } from './components/todoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const prepareTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedTodos: [...prepareTodos],
  }

  addTodoCard = (todo) => {
    this.setState(prevState => ({
      preparedTodos: [...prevState.preparedTodos, todo],
    }));
  }

  render() {
    const {
      preparedTodos,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          users={users}
          todos={preparedTodos}
          addTodoCard={this.addTodoCard}
        />
        <TodoList todoList={preparedTodos} />
      </div>
    );
  }
}

export default App;
