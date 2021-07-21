import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: [...todos],
  }

  getToUpdate = (todo) => {
    this.setState(prevState => (
      prevState.todos.push(todo)
    ));
  }

  render() {
    return (
      <div className="wraper">
        <TodoList
          users={users}
          todos={this.state.todos}
        />
        <TodoForm
          todos={this.state.todos}
          getToUpdate={this.getToUpdate}
          users={users}
        />
      </div>
    );
  }
}

export default App;
