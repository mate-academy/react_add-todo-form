import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/From';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  userName: usersFromServer.find(user => todo.userId === user.id).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,

  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { ...todo }],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">

        <h1>Add todo form</h1>

        <div className="container-todo">
          <Form
            users={usersFromServer}
            todos={todos}
            addTodo={this.addTodo}
          />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
