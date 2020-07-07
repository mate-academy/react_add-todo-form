import React from 'react';
import './App.css';
import { TodoForm } from './Component/TodoForm';
import TodoList from './Component/TodoList';

import todos from './api/todos';
import users from './api/users';

function getTodosWithUsers(allTodos, allUsers) {
  return allTodos.map(oneTodo => ({
    ...oneTodo,
    user: allUsers.find(person => person.id === oneTodo.userId),
  }));
}

export class App extends React.Component {
  state = {
    allTodos: getTodosWithUsers(todos, users),
  }

  addTodo = newTodo => (
    this.setState(prevState => ({
      allTodos: [...prevState.allTodos, {
        ...newTodo,
        id: prevState.allTodos.length + 1,
      }],
    }))
  );

  render() {
    return (
      <>
        <div className="App">
          <TodoForm addTodo={this.addTodo} />
        </div>
        <TodoList todos={this.state.allTodos} />
      </>
    );
  }
}
