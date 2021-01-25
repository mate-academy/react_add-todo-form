import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.filter(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todo: preparedTodos,
  }

  addTodo = (user, title) => {
    this.setState(prevState => ({
      todo: [
        ...prevState.todo,
        {
          user,
          title,
          id: prevState.todo.length,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <Form users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todo} />
      </div>
    );
  }
}

export default App;
