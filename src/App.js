import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

const preparedTodos = todos.map(item => (
  {
    ...item,
    user: users.find(user => (user.id === item.id)),
  }
));

class App extends React.Component {
  state = {
    preparedTodos,
  }

  updateTodosList = (newTodoTitle, selectedExecutant) => {
    this.setState((state) => {
      const newTodo = {
        title: newTodoTitle,
        id: state.preparedTodos.length + 1,
        userId: +selectedExecutant,
        user: users.find(user => (user.id === +selectedExecutant)),
      };

      return {
        preparedTodos: [...state.preparedTodos, newTodo],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <NewTodo updateTodosList={this.updateTodosList} />
        <TodoList preparedTodos={this.state.preparedTodos} />
      </div>
    );
  }
}

export default App;
