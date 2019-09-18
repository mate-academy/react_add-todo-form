import React, { Component } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';
import getTodosWithUsers from './dataMappers';
import AddTodo from './components/AddTodo/AddTodo';

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
          todosList={todosList}
          users={users}
        />
        <TodoList todos={todosWithUsers} />
      </>
    );
  }
}

export default App;
