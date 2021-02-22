import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedTodos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      preparedTodos: [
        ...state.preparedTodos,
        todo,
      ],
    }));
  };


  render() {
    const { preparedTodos } = this.state;

    return (
      <div className="App" >
        <h1>Add todo form</h1>

        <p>
          <span>Todos: </span>
          {preparedTodos.length}
        </p>

        <div className="container">
          <TodoList
            preparedTodos={preparedTodos}
          />

          <Form
            preparedTodos={preparedTodos}
            users={users}
            addTodo={this.addTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
