import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    todosWidthUsers: [],
  };

  componentDidMount() {
    this.setState({
      users: [...users],
      todos: [...todos],
      todosWidthUsers: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  }

  sortingByTitle = () => {
    this.setState(prevState => ({
      todosWidthUsers: prevState.todosWidthUsers
        .sort((todoA, todoB) => ((todoA.title > todoB.title) ? 1 : -1)),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {this.state.users.length}
        </p>
        <button
          type="submit"
          onClick={this.sortingByTitle}
        >
          Sort By Title
        </button>
        <TodoList
          users={this.state.users}
          todos={this.state.todos}
          todosWidthUsers={this.state.todosWidthUsers}
        />
      </div>
    );
  }
}

export default App;
