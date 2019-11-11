import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import TodoList from './components/todoList';
import NewTodo from './components/NewTodo';

function getTodoWithUsers(arg1, arg2) {
  return arg1.map((todo) => {
    const todoUsers = {
      ...todo,
      user: arg2.find(user => user.id === todo.userId),
    };

    return todoUsers;
  });
}

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  state = {
    todosArr: todos,
    idCount: () => {
      const id = todos.map(item => item.id);

      return Math.max(...id);
    },
  }

  addTodo = (userId, title) => {
    const todo = {
      userId,
      title,
      id: this.state.idCount,
      completed: false,
    };

    this.setState(prev => (
      {
        todosArr: [...prev.todosArr, todo],
        idCount: prev.idCount + 1,
      }
    ));
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Static list of todos</h1>
        </div>
        <TodoList todos={getTodoWithUsers(this.state.todosArr, users)} />
        <NewTodo receiveNewTodo={this.addTodo} />
      </>
    );
  }
}

export default App;
