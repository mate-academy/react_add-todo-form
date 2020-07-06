import React from 'react';
import './App.css';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

import { users as usersFromServer } from './api/users';
import { todos as todosFromServer } from './api/todos';

const todosList = (todos) => {
  const getUserById = userId => usersFromServer
    .find(user => user.id === userId);

  return todos.map(list => ({
    ...list,
    user: getUserById(list.userId),
  }));
};

class App extends React.Component {
  state = {
    todos: todosList(todosFromServer),
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo app</h1>
        <NewTodo
          users={usersFromServer}
          todos={todos}
          addTodo={this.addTodo}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
