import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const todosArr = todos.map(todo => (
  {
    ...todo,
    userName: users.find(user => todo.userId === user.id).name,
  }));

class App extends React.Component {
  state = {
    list: todosArr,
  };

  addUser = (title, id) => {
    this.setState((state) => {
      const myTodo = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        userId: id,
        userName: users.find(user => user.id === id).name,
      };

      return {
        list: [...state.list, myTodo],
      };
    });
  }

  render() {
    const { list } = this.state;

    return (

      <div className="container">
        <div className="App">
          <h1>Static list of todos</h1>
          <TodoForm addUser={this.addUser} />
          <TodoList list={list} />
        </div>
      </div>
    );
  }
}

export default App;
