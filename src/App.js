import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (newTodoValues) => {
    this.setState((prevState) => {
      const newTodo = {
        ...newTodoValues,
        id: prevState.todos.length + 1,
        completed: false,
        user: usersFromServer.find(user => user.id === newTodoValues.userId),
      };

      return {
        todos: [...prevState.todos, newTodo],
      };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">List of todos</h1>
        <Form
          users={usersFromServer}
          addTodo={this.addTodo}
        />
        <TodoList todoList={todos} />
      </div>
    );
  }
}

export default App;
