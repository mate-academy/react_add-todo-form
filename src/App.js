import React from 'react';
import { TodoList } from './TodoList';

import './App.css';

import initTodos from './api/todos';
import initUsers from './api/users';
import NewTodoForm from './NewTodoForm';

const preparedTodos = initTodos.map(todo => (
  {
    ...todo,
    user: initUsers.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, selectedUser) => {
    this.setState((state) => {
      const newTodo = {
        title,
        user: initUsers
          .find(person => person.name === selectedUser),
        id: Date.now(),
      };

      return ({
        todos: [...state.todos, newTodo],
      });
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {todos.length}
        </p>

        <NewTodoForm
          addTodo={this.addTodo}
          initUsers={initUsers}
        />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
