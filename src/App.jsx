import React from 'react';
import todos from './api/todos';
import users from './api/users';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import './App.css';

const preparedTodos = todos.map(todo => ({
  user: users.find(person => person.id === todo.userId),
  ...todo,
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  };

  addTodo = (todo) => {
    this.setState(state => ({
      todosList: [...state.todosList, todo],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="todo">
            <h1 className="todo__title">Add todo form</h1>
            <TodoForm
              users={users}
              addTodo={this.addTodo}
              nextId={todosList.length + 1}
            />
            <TodoList todos={todosList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
