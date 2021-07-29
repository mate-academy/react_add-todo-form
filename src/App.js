import React from 'react';
import './App.css';
import { TodoList } from './cmponents/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Form } from './cmponents/Form';

class App extends React.Component {
  state = {
    todos,
  };

  addTodos = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  todosWithUsers = () => (
    this.state.todos.map(todo => ({
      ...todo,
      name: users.find(user => user.id === todo.userId).name,
    }))
  );

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form users={users} todos={this.state.todos} addTodos={this.addTodos} />
        <TodoList todos={this.todosWithUsers()} />
      </div>
    );
  }
}

export default App;
