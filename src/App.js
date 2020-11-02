import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    listOfTodos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      listOfTodos: [
        {
          ...todo,
          completed: false,
          id: preparedTodos.length + 1,
          user: users.find(user => todo.userId === user.id),
        },
        ...prevState.listOfTodos],

    }));
  }

  render() {
    return (
      <div className="App section">
        <h1 className="title">List of Todos</h1>
        <div className="columns">
          <div className="column is-two-fifths">
            <Form onSubmit={this.addTodo} />
          </div>
          <div className="column auto">
            <TodoList todos={this.state.listOfTodos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
