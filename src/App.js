import React from 'react';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList';

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
  }

  addNewTodo = (title, userId) => {
    const { todos } = this.state;
    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;

    this.setState({
      todos: [...todos, {
        id,
        userId,
        title,
      }],
    });
  }

  render() {
    const { addNewTodo } = this;
    const { todos } = this.state;

    return (
      <div className="App">
        <AddTodoForm addNewTodo={addNewTodo} />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
