import React from 'react';
// import classNames from 'classnames';
import { TodosList } from './components/TodosList';
import { AddToDoForm } from './components/AddToDoForm';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

const preparedToDoes = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedToDoes,
    maxId: Math.max(...preparedToDoes.map(todo => todo.id)),
  };

  addTodo = (title, userId) => {
    const newTodo = {
      userId,
      id: this.state.maxId + 1,
      title,
      completed: false,
      user: getUserById(userId),
  };

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
      maxId: state.maxId + 1,
    }));
  }
  
  render() {
    const { todosList } = this.state;
    
    return (
      <div className="App">
        <h1>Add todo form</h1>
          <AddToDoForm onAdd={this.addTodo} />
          <TodosList todosList={todosList} />
      </div>
    );
  }
}

export default App;
