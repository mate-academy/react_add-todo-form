import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoLisst/TodoList';
import { AddForm } from './components/AddForm/AddForm';

const preparedTodos = todos.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state ={
    todosArr: [...preparedTodos],
  };

  addTodo = (todoTitle, userId) => {
    const newTodo = {
      title: todoTitle,
      completed: false,
      id: this.findMaxId() + 1,
      userId,
      user: users.find(person => person.id === userId),
    };

    this.setState(state => ({
      todosArr: [...state.todosArr, newTodo],
    }));
  };

  findMaxId() {
    const { todosArr } = this.state;
    const idsArr = todosArr.map(todo => todo.id);

    return Math.max(...idsArr);
  }

  render() {
    const { todosArr } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">List of todos</h1>
        <AddForm onAdd={this.addTodo} />
        <TodoList todosArr={todosArr} />
      </div>
    );
  }
}

export default App;
