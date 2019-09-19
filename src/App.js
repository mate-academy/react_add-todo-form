import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import getTodosWithUsers from './dataMappers';
import todos from './api/todos';
import users from './api/users';
import './App.css';

class App extends Component {
  state = {
    todosWithUsers: getTodosWithUsers(todos, users),
    todosList: todos,
  };

  addTodos = (todo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo],
      todosWithUsers: getTodosWithUsers([...prevState.todosList, todo], users),
    }));
  };

  render() {
    const { todosList, todosWithUsers } = this.state;

    return (
      <>
        <AddTodo
          addTodos={this.addTodos}
          todosListLength={todosList.length}
          users={users}
        />
        <TodoList todos={todosWithUsers} />
      </>
    );
  }
}

export default App;
