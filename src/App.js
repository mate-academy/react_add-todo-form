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
    todosTotal: preparedTodos,
  }

  addTodo = (user, title) => {
    const { todosTotal } = this.state;

    this.setState(state => ({
      todosTotal: [
        ...state.todosTotal,
        {
          id: todosTotal.length + 1,
          title,
          completed: false,
          user,
          userId: user.id,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <Form users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todosTotal} />
      </div>
    );
  }
}

export default App;
