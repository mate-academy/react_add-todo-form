import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const todosPrepared = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId).name,
  }),
);

export class App extends React.Component {
  state = {
    todos: todosPrepared,
  };

  addTodos = (user, title) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: users.find(item => item.name === user).id,
          id: state.todos.length + 1,
          user,
          title,
          components: false,
        },
      ],
    }));
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <h3>{`Users: ${users.length}`}</h3>
        <h3>{`Todos: ${todos.length}`}</h3>
        <TodoForm
          users={users}
          addTodos={this.addTodos}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}
