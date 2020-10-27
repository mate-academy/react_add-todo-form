import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { Error } from './components/Error';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    selected: '',
    newTodoTitle: '',
    error: '',
    errorHidden: true,
  }

  handleSelect = (event) => {
    this.setState({
      selected: event.target.value,
      error: '',
      errorHidden: true,
    });
  }

  handleTodoInput = (event) => {
    this.setState({
      newTodoTitle: event.target.value.replace(/[^\w ]+/, ''),
      error: '',
      errorHidden: true,
    });
  }

  addTodo = (event) => {
    const { selected, newTodoTitle } = this.state;

    event.preventDefault();

    if (selected !== '' && newTodoTitle !== '') {
      this.setState(state => ({
        todosList: [
          ...state.todosList,
          {
            userId: +selected,
            id: state.todosList.length + 1,
            title: newTodoTitle,
            completed: false,
            user: users.find(user => user.id === +selected),
          }],
        selected: '',
        newTodoTitle: '',
      }
      ));
    } else if (selected) {
      this.setState({
        error: 'title',
        errorHidden: false,
      });
    } else {
      this.setState({
        error: 'user',
        errorHidden: false,
      });
    }
  }

  render() {
    const {
      todosList,
      selected,
      newTodoTitle,
      error,
      errorHidden,
    } = this.state;

    return (
      <div className="App">
        <h1 className="todo__title">To do List</h1>
        <Form
          todos={todosList}
          onSelect={this.handleSelect}
          onInput={this.handleTodoInput}
          onAdd={this.addTodo}
          selected={selected}
          newTodoTitle={newTodoTitle}
        />
        {errorHidden || <Error type={error} />}
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
