import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import NewToDo from './components/NewToDo';

import users from './api/users';
import TodoList from './components/TodoList';

class App extends React.Component {
  initialTodos = [...this.props.todos].map((item) => {
    const { id, title, completed } = item;

    return {
      ...{
        id, title, completed,
      },
      userName: users.find(user => (user.id === item.userId)).name,
    };
  })

  state = {
    todos: this.initialTodos,
    usersNames: [...users].map(user => user.name).sort(),
  }

  addToDoFunction = (toDoFromForm) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: prevState.todos.length + 1, ...toDoFromForm,
      }],
      usersNames: [...(new Set([
        ...prevState.usersNames,
        toDoFromForm.userName]))].sort(),
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {this.state.todos.length}
        </p>
        <TodoList preparedTodos={this.state.todos} />
        <NewToDo
          addToDoFunction={this.addToDoFunction}
          todos={this.state.todos}
          usersNames={this.state.usersNames}
        />

        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
