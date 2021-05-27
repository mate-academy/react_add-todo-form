import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId).name,
    })),
    users: usersFromServer,
  }

  addNewTodo = (todoTitle, todoUser) => {
    const { todos, users } = this.state;

    const newTodo = {
      userId: users.find(user => user.name === todoUser).id,
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
      user: todoUser,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm addNewTodo={this.addNewTodo} users={users} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
