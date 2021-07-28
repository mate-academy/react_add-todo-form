import React from 'react';
import todos from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodosList';
import 'bulma/css/bulma.css';
import users from './api/users';

export class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  addTodo = (title, userId) => {
    this.setState((state) => {
      const newTodo = {
        userId,
        id: +new Date(),
        title,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      return ({
        todos: [newTodo, ...state.todos],
      });
    });
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <AddTodoForm addTodo={this.addTodo} users={users} />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}
