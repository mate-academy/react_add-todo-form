import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/todolist/TodoList';
import { TodoForm } from './components/todoform/TodoForm';

const prepearedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: prepearedTodos,
  }

  addTodo = (title, user) => {
    this.setState((prevState) => {
      const newTodo = {
        userId: user.id,
        id: prevState.todos.length + 1,
        title,
        completed: false,
        user,
      };

      return { todos: [...prevState.todos, newTodo] };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="App__wrapper">
          <TodoForm
            users={users}
            addTodo={this.addTodo}
          />

          <TodoList
            todos={todos}
          />
        </div>
      </div>
    );
  }
}

export default App;
