import React from 'react';
import './App.css';

import usersApi from './api/users';
import todosApi from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

const preparedTodos = todosApi.map(todo => ({
  ...todo,
  user: usersApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
    users: [...usersApi],
  }

  addTodo = (todo) => {
    const { users } = this.state;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        title: todo.title,
        id: prevState.todos.length + 1,
        completed: false,
        userId: Number(todo.userId),
      }].map(currentTodo => ({
        ...currentTodo,
        user: users.find(user => user.id === currentTodo.userId),
      })),
    }));
  }

  render() {
    const { users } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
