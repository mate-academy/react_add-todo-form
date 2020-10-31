import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/todolist';
import { TodoForm } from './components/todoform';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
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
        <h1 className="App__title">Add todo form</h1>
        <div className="App__todos todos">
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
