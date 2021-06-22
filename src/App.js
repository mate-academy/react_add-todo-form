import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/todosList';
import { AddTodoForm } from './components/AddTodoForm';

class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      user: users.find(({ userId }) => users.id === userId),
    })),
  }

  addTodo = (todo) => {
    this.setState({
      preparedTodos: [
        todo,
        ...this.state.preparedTodos]
    })
  }

  render() {
    return (
      <>
        <div className="App">
          <AddTodoForm addTodo={this.addTodo} nextTodoId={
            this.state.preparedTodos[this.state.preparedTodos.length - 1].id + 1
          }/>
          <TodoList
            preparedTodos={this.state.preparedTodos}
          />
        </div>
      </>
    );
  }
}

export default App;
