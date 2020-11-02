import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

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
        <TodoForm users={users} addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
