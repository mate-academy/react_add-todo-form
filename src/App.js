import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoLIst/TodoList';

class App extends React.Component {
  state = {
    listTodos: todos.map(todo => (
      {
        ...todo,
        user: users.find(item => item.id === todo.userId),
      })),
  };

  createNewTodo = ({ userId, title }) => this.setState(prevState => ({
    listTodos: [
      ...prevState.listTodos,
      {
        user: users.find(item => item.id === userId),
        userId,
        id: prevState.listTodos.length + 1,
        title,
        completed: false,
      },
    ],
  }));

  render() {
    const { createNewTodo } = this;
    const { listTodos } = this.state;

    return (
      <div className="App">
        <h1 className="title">Static list of todos</h1>
        <NewTodo createNewTodo={createNewTodo} />
        <TodoList listTodos={listTodos} />
      </div>
    );
  }
}

export default App;
