import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { AddGoodForm } from './component/AddGoodForm';
import { TodoList } from './component/TodoList';

interface State {
  todoList: Todo[],
}

const todosList: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export default class App extends React.Component<{}, State> {
  state: State = {
    todoList: [...todosList],
  };

  addTodo = (newTodo: Todo) => {
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newTodo],
    }));
  };

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <AddGoodForm todos={todoList} addTodo={this.addTodo} />
        <TodoList todos={todoList} />
      </div>
    );
  }
}
