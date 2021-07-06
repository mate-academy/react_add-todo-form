import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import todos from './api/todos';
import users from './api/users';

const preparedUsers = users.map(user => ({
  id: user.id,
  name: user.name,
}));

// searching max todoId
let todoMaxId = 0;

const preparedTodos = todos.map((todo) => {
  if (todo.id > todoMaxId) {
    todoMaxId = todo.id;
  }

  return {
    userName: preparedUsers.find(user => user.id === todo.userId).name,
    ...todo,
  };
});

export class App extends React.Component {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="app">
        <NewTodo
          maxId={todoMaxId}
          users={preparedUsers}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
