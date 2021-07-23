import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    currentTodos: todos,
  };

  changeCurrentTodos = (newTodo) => {
    this.setState(prevState => ({
      currentTodos: [...prevState.currentTodos, newTodo],
    }));
  }

  render() {
    const {
      currentTodos,
    } = this.state;

    const preparedTodos = currentTodos.map(todo => ({
      ...todo,
      user: users.find(person => (
        person.id === todo.userId
      )),
    }));

    return (
      <div className="App">
        <TodoList todos={preparedTodos} />
        <h1>Add some Tasks</h1>
        <TodoForm
          currentTodos={currentTodos}
          users={users}
          changeCurrentTodos={this.changeCurrentTodos}
        />
      </div>
    );
  }
}

export default App;
