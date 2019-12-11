import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoLIst';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUsers,
    /* eslint-disable */
    currentId: todosWithUsers.length + 1,
    /* eslint-enable */
  };

  addTodo = (title, userId) => {
    this.setState((state) => {
      const myTodo = {
        id: state.currentId,
        title,
        userId,
        user: users.find(user => user.id === userId),
      };

      return {
        todos: [...state.todos, myTodo],
        currentId: state.currentId + 1,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <NewTodo addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default App;
