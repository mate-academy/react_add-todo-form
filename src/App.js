import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.css';

import initialTodos from './api/initialTodos';
import users from './api/users';

const preparedTodos = initialTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, userId) => {
    const newTodo = {
      title,
      userId: Number(userId),
      id: this.state.todos.length + 1,
      completed: false,
      user: users.find(user => user.id === +userId),
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <Form users={users} addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
