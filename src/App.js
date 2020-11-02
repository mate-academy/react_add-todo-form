import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, user) => {
    this.setState((state) => {
      const newTodo = {
        userId: user.id,
        id: state.todos.length + 1,
        title,
        completed: false,
        user,
      };

      return { todos: [...state.todos, newTodo] };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="container">
        <h1>Add todo form</h1>
        <div className="d-flex">
          <TodoList
            todos={todos}
          />

          <TodoForm
            users={users}
            addTodo={this.addTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
