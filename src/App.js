import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(todosArr, usersArr) {
  return todosArr.map(todo => (
    {
      ...todo,
      user: { ...usersArr.find(user => user.id === todo.userId) },
    }
  ));
}

class App extends React.Component {
  state = {
    newTodos: [...todos],
  }

  addTodo = (todo) => {
    this.setState(state => ({
      newTodos: [...state.newTodos, todo],
    }));
  }

  render() {
    const { newTodos } = this.state;

    return (
      <>
        <h1>To Do List</h1>
        <NewTodo users={users} addTodo={this.addTodo} />
        <ToDoList todos={getTodosWithUsers(newTodos, users)} />
      </>
    );
  }
}

export default App;
