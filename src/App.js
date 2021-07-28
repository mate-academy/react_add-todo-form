import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUser = userId => usersFromServer.find(user => user.id === userId);

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.PureComponent {
  state = {
    users: usersFromServer,
    todos: todosWithUsers,
  };

  nextId = this.state.todos.reduce(
    (maximum, todo) => Math.max(todo.id, maximum), 0,
  ) + 1

  addTodo = (userId, title) => {
    const newTodo = {
      userId,
      user: findUser(userId),
      id: this.nextId,
      title,
      completed: false,
    };

    this.setState(({ todos }) => ({ todos: [newTodo, ...todos] }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo:</h1>
        <AddTodo users={users} addTodo={this.addTodo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
