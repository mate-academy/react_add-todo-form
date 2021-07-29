import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodosList } from './components/TodosList';
import { Form } from './components/Form';
// import { Tabs } from 'boo'

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id).name,
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    value: '',
    user: '',
    completed: false,
  }

  addTodo = newTodo => this.state.user
  && this.state.value
  && this.setState(state => ({
    todosList: [
      ...state.todosList,
      newTodo,
    ],
    value: '',
    user: '',
    completed: false,
  }
  ));

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;

    if (value === 'true') {
      value = true;
    }

    if (value === 'false') {
      value = false;
    }

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todosList, value, user, completed } = this.state;
    const { handleChange, addTodo, onChange } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Todos: </span>
          {todosList.length}
        </p>
        <TodosList list={todosList} />
        <Form
          change={handleChange}
          addTodo={addTodo}
          onChange={onChange}
          value={value}
          person={user}
          length={todosList.length}
          isCompleted={completed}
        />
      </div>
    );
  }
}

export default App;
