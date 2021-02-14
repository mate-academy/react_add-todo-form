import React from 'react';
import './App.css';

import usersApi from './api/users';
import todosApi from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo';

const preparedTodos = todosApi.map((todo) => {
  const user = usersApi.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodos = (title, name) => {
    const user = usersApi.find(person => person.name === name);

    const newTodo = {
      userId: user.id,
      id: this.state.todos.length + 1,
      user,
      title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>
        <p>
          <span className="info">Todos: </span>
          {todos.length}
        </p>
        <p>
          <span className="info">Users: </span>
          {usersApi.length}
        </p>
        <NewTodo
          users={usersApi}
          addTodos={this.addTodos}
        />
        <div className="block_todo">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
