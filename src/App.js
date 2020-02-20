import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList/TodoList';
import NewTodo from './NewTodo/NewTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { ...todo }],
    }));
  }

  render() {
    return (
      <div className="app">
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
