import React from 'react';
import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import './App.css';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  };

  addTodoToList = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>
          Todo Form
        </h1>

        <TodoForm
          users={users}
          addTodo={this.addTodoToList}
          newTodoId={Math.max(...todos.map(todo => todo.id)) + 1}
        />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
