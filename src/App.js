import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    todos,
    users,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  render() {
    return (
      <div className="App">
        <TodoList
          users={this.state.users}
          todos={this.state.todos}
          addTodo={this.addTodo}
        />
      </div>
    );
  }
}

export default App;
