import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    allTodos: [...preparedTodos],
  }

  createTodo = (newTodo) => {
    this.setState(prevState => ({
      allTodos: [
        ...prevState.allTodos,
        newTodo,
      ],
    }));
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__title">Add new todo for user</h1>
        <NewTodo
          users={users}
          createTodo={this.createTodo}
          allTodos={this.state.allTodos}
        />
        <TodoList list={this.state.allTodos} />
      </div>
    );
  }
}

export default App;
