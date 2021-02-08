import React from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoss: todos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todoss: [
        ...state.todoss,
        todo,
      ],
    }));
  };

  render() {
    const { todoss } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          users={users}
          newTodoId={todoss.length + 1}
          addTodo={this.addTodo}
        />
        <TodoList todos={todoss} users={users} />
      </div>
    );
  }
}

export default App;
