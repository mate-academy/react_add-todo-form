import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId).name,
}));

export class App extends React.Component {
  state = {
    todoList: preparedTodos,
  }

  addInList = (newTodo) => {
    const { todoList } = this.state;
    const newtodoList = [...todoList];
    const preparedTodo = newTodo;

    preparedTodo.id = todoList[todoList.length - 1].id + 1;

    newtodoList.push(preparedTodo);

    this.setState({
      todoList: newtodoList,
    });
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          todoList={todoList}
          users={users}
          addInList={this.addInList}
        />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}

export default App;
