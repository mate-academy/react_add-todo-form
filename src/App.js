import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  onAdd = (todo) => {
    this.setState(state => ({
      todosList: [
        ...state.todosList,
        todo,
      ],
    }));
  }

  render() {
    const {
      todosList,
    } = this.state;

    return (
      <div className="App">
        <h1 className="todo__title">To do List</h1>
        <Form
          onAdd={this.onAdd}
          todosLength={todosList.length}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
