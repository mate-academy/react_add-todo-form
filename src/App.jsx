import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [...todos],
  }

  addTodo = (todo, userId) => {
    this.setState(state => ({ todos: [...state.todos, {
      title: todo,
      userId,
      id: state.todos.length + 1,
      completed: false,
    }] }));
  }

  render() {
    const preparedTodos = this.state.todos.map((todo) => {
      const user = users.find(({ id }) => id === todo.userId);

      return {
        ...todo, user,
      };
    });

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm users={users} addTodo={this.addTodo} />
        <TodoList todos={[...preparedTodos]} />
      </div>
    );
  }
}

export default App;
