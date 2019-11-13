import React, { Component } from 'react';
import Input from './Input';
import TodoList from './TodoList';
import users from '../api/users';
import todos from '../api/todos';
import todoWithUsers from '../todoWithUsers';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoWithUsers(todos, users),
      counterId: todos.length,
    };
    this.AddTodo = this.AddTodo.bind(this);
  }

  AddTodo(title, user) {
    const tempTodo = {
      userId: 0,
      id: 0,
      title: 'delectus aut autem',
      completed: false,
    };
    const newCounter = this.state.counterId + 1;

    tempTodo.title = title;
    tempTodo.user = user;
    tempTodo.id = newCounter;
    tempTodo.userId = user.id;
    this.setState(prevState => (
      {
        todos: [...prevState.todos, tempTodo],
        counterId: newCounter,
      }
    ));
  }

  render() {
    return (
      <>
        <Input onSubmit={this.AddTodo} />
        <TodoList todos={this.state.todos} />
      </>
    );
  }
}

export default NewTodo;
