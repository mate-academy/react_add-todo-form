import React from 'react';
import './App.scss';
import { ListTodo } from './components/ListTodo/ListTodo';
import usersData from './api/users';
import todosData from './api/todos';
import { Form } from './components/Form/Form';

const filteredList = todosData.map(todo => ({
  ...todo,
  user: usersData.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    listTodos: [...filteredList],
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      listTodos: [...prevState.listTodos, todo],
    }));
  };

  render() {
    const { listTodos } = this.state;

    return (
      <>
        <div className="App">
          <h1 className="title">Todo List</h1>
          <div className="wrapper">
            <ListTodo filteredList={listTodos} />
            <Form
              users={usersData}
              addTodo={this.addTodo}
            />
          </div>

        </div>
      </>
    );
  }
}

export default App;
