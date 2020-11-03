import React from 'react';

import { AddTodoForm } from './components/addTodoForm';
import { TodoList } from './components/todoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosNew: [...preparedTodos],
  }

  changeState = (todo) => {
    this.setState(prev => ({
      todosNew: [...prev.todosNew, todo],
    }));
  }

  render() {
    const {
      todosNew,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          users={users}
          todos={todosNew}
          changeState={this.changeState}
        />
        <TodoList todoList={todosNew} />
      </div>
    );
  }
}

export default App;
