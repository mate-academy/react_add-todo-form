import React from 'react';
import './App.scss';
import { ListTodo } from './components/ListTodo/ListTodo';
import usersData from './api/users';
import todosData from './api/todos';
import { Form } from './components/Form/Form';

const filteredTodoList = todosData.map(todo => ({
  ...todo,
  user: usersData.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...filteredTodoList],
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <div className="app">
          <h1 className="title">Todo List</h1>
          <div className="wrapper">
            <ListTodo todos={todos} />
            <Form
              users={usersData}
              addTodo={this.addTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
